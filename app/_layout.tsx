import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { View, StyleSheet } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [loaded, error] = useFonts({
    'Duitech': require('../assets/fonts/Duitech.otf'),
    'NettRanego': require('../assets/fonts/NettRanego.ttf'),
    'SANSSULEX': require('../assets/fonts/SANSSULEX.ttf'),

  });
    useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }  }, [loaded, error]);


  if (!isVideoFinished) {
    return (
      <View style={styles.container}>
        <Video
          source={require("@/assets/videos/splashvideo.mp4")}
          style={StyleSheet.absoluteFill}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping={false}
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              if (status.isPlaying) {
                
                SplashScreen.hideAsync().catch(() => {});
              }
              if (status.didJustFinish) {
                
                setIsVideoFinished(true);
              }
            }
          }}
        />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1013',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
