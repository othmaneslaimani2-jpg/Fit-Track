import React, { useState, useEffect, useRef, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import Stopwatch from '@/app/components/Stopwatch';
import SessionCard from '@/app/components/SessionCard';
import { useLocationTracking } from '@/app/hooks/useLocationTracking';
import { useStepTracking } from '@/app/hooks/usePedometer';
import { useSessionStore, SessionData } from '@/app/store/sessionStore';

const { width } = Dimensions.get("window");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SpringButton({ onPress, style, children }: { onPress: () => void, style: any, children: React.ReactNode }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  
  return (
    <AnimatedPressable
      style={[style, animatedStyle]}
      onPressIn={() => { scale.value = withSpring(0.9, { damping: 10, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 10, stiffness: 300 }); }}
      onPress={onPress}
    >
      {children}
    </AnimatedPressable>
  );
}

export default function SessionScreen() {
  const { startTracking, stopTracking, isTracking, distance, currentLocation, routeCoordinates } = useLocationTracking();
  const { steps: totalSteps } = useStepTracking();
  const { addSession } = useSessionStore();
  
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [startSteps, setStartSteps] = useState(0);
  const webViewRef = useRef<WebView>(null);
  
  const pulseScale = useSharedValue(1);

  const initialLocation = useRef(currentLocation);

  const mapHtml = useMemo(() => {
    const lat = initialLocation.current?.coords.latitude || 0;
    const lng = initialLocation.current?.coords.longitude || 0;
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
              body { padding: 0; margin: 0; background-color: #0c0f12; }
              #map { height: 100vh; width: 100vw; }
              .leaflet-container { background: #0c0f12; }
              .leaflet-control-attribution { display: none !important; }
          </style>
      </head>
      <body>
          <div id="map"></div>
          <script>
              var map = L.map('map', {zoomControl: false, dragging: false, scrollWheelZoom: false}).setView([${lat}, ${lng}], 16);
              L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                  maxZoom: 20
              }).addTo(map);
              var polyline = L.polyline([], {color: '#c6ff00', weight: 4}).addTo(map);
              var marker = L.circleMarker([${lat}, ${lng}], {color: '#c6ff00', fillColor: '#c6ff00', fillOpacity: 1, radius: 6}).addTo(map);
              
              window.updateLocation = function(lat, lng) {
                  var latlng = [lat, lng];
                  map.setView(latlng);
                  marker.setLatLng(latlng);
                  polyline.addLatLng(latlng);
              };
          </script>
      </body>
      </html>
    `;
  }, []);

  useEffect(() => {
    if (sessionActive && currentLocation && webViewRef.current) {
      const { latitude, longitude } = currentLocation.coords;
      webViewRef.current.injectJavaScript(`window.updateLocation(${latitude}, ${longitude}); true;`);
    }
  }, [currentLocation, sessionActive]);
  
  useEffect(() => {
    if (sessionActive) {
      pulseScale.value = withRepeat(
        withTiming(1.03, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 300 });
    }
  }, [sessionActive]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }]
  }));

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (sessionActive) {
      interval = setInterval(() => {
        setTimeInSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive]);

  const handleStartSession = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setStartSteps(totalSteps);
    setTimeInSeconds(0);
    setSessionActive(true);
    startTracking();
  };

  const handleStopSession = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSessionActive(false);
    stopTracking();
    
    const formatTime = (totalSeconds: number) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      if (hours > 0) return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const newSession: SessionData = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
      type: 'RUNNING',
      distance: (distance / 1000).toFixed(2),
      calories: currentCalories.toString(),
      time: formatTime(timeInSeconds),
      steps: currentSteps.toString(),
      timestamp: Date.now()
    };

    addSession(newSession);
  };

  const currentSteps = sessionActive ? Math.max(totalSteps - startSteps, 0) : 0;
  const currentCalories = Math.floor(currentSteps * 0.04);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        

        <View style={styles.header}>
          <View>
            <Text style={styles.titleText}>ACTIVITY</Text>
            <Text style={styles.userName}>RUNNING</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Animated.View style={[pulseStyle, { alignItems: 'center' }]}>
            <Stopwatch timeInSeconds={timeInSeconds} />
          </Animated.View>
          
          <SessionCard 
            distance={distance} 
            steps={currentSteps} 
            calories={currentCalories} 
          />

          <View style={styles.mapContainer}>
            {sessionActive && currentLocation ? (
              <WebView
                ref={webViewRef}
                source={{ html: mapHtml }}
                style={styles.map}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <View style={styles.mapPlaceholder}>
                <Ionicons name="map-outline" size={48} color="#333" />
                <Text style={styles.mapPlaceholderText}>
                  Start session to activate map
                </Text>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            {!sessionActive ? (
              <SpringButton style={styles.startButton} onPress={handleStartSession}>
                <Ionicons name="play" size={48} color="#000" />
                <Text style={styles.startButtonText}>START</Text>
              </SpringButton>
            ) : (
              <SpringButton style={styles.stopButton} onPress={handleStopSession}>
                <Ionicons name="stop" size={48} color="#fff" />
                <Text style={styles.stopButtonText}>STOP</Text>
              </SpringButton>
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f12",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  titleText: {
    fontSize: width * 0.04,
    textAlign: "left",
    color: "#a5a5a5",
    fontFamily: 'Duitech',
  },
  userName: {
    textAlign: "left",
    fontSize: width * 0.07,
    color: "#70e000",
    fontFamily: 'NettRanego',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  startButton: {
    backgroundColor: "#c6ff00",
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#c6ff00",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
  },
  startButtonText: {
    color: "#000",
    fontFamily: 'SANSSULEX',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  stopButton: {
    backgroundColor: "#ff3333",
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#ff3333",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
  },
  stopButtonText: {
    color: "#fff",
    fontFamily: 'SANSSULEX',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  mapContainer: {
    height: 200,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1f24',
    borderWidth: 1,
    borderColor: '#333',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    color: '#a5a5a5',
    fontFamily: 'Duitech',
    marginTop: 10,
    fontSize: 14,
  }
});
