import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProgressRing from '@/app/components/ProgressRing';
import { useStepTracking } from '@/app/hooks/usePedometer';
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  const { steps, startTracking } = useStepTracking();

  useEffect(() => {
    startTracking();
  }, [startTracking]);

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/Logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.headerHolder}>
          <View style={styles.userGreeting}>
            <Text style={styles.titleText}>GOOD MORNING</Text>
            <Text style={styles.userName}>OTHMANE</Text>
          </View>
          <Image
            source={require("@/assets/images/userProfile.png")}
            style={{
              width: 65,
              height: 65,
              borderRadius: 50,
              borderColor: "#70e000",
              borderWidth: 3,
              justifyContent: "flex-start",
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.progressContainer}>
          <ProgressRing 
            progress={Math.min(steps / 100, 1)} 
            radius={80}     
            strokeWidth={12} 
            color="#70e000" 
          >
            <Svg width="40" height="40" viewBox="0 0 24 24" style={{ marginBottom: 5 }}>
              <Path fill="#70e000" d="M5.4 9.5H2.2q.1-.35.263-.663t.387-.612l3.85-5.15q.425-.575 1.137-.763t1.363.163l.7.35q.525.275.813.75T11 4.625v2.1l1.85-.475q.75-.2 1.45.188t.95 1.112l1.625 4.9l4.25 4.25q.5.5.688 1.075T22 19q0 .925-.5 1.65t-1.3 1.075L8.85 10.875q-.725-.675-1.6-1.025T5.4 9.5ZM14.15 22q-.75 0-1.425-.275t-1.25-.775L3.35 13.575q-.475-.425-.775-.962T2.15 11.5H5.4q.575 0 1.113.2t.962.625L17.575 22H14.15Z" />
            </Svg>
            <Text style={{ color: 'white', fontSize: 40, fontFamily: 'SANSSULEX' }}>{steps}</Text>
            <Text style={{ color: '#a5a5a5', fontSize: 16, fontFamily: 'Duitech', marginTop: -5 }}>STEPS</Text>
          </ProgressRing>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c1013ff",
  },
  header: {
    width: width,
    alignItems: "center",
    paddingTop: height * 0.06,
  },
  content: {
    flex: 1,

    paddingHorizontal: width * 0.05,
  },
  headerHolder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: height * 0.02,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.08,
  },
  logoImage: {
    width: width * 0.5,
    height: height * 0.08,
    maxHeight: 60,
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
  userImage: {
    flex: 1,
    backgroundColor: "none",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  userGreeting: {
    flexDirection: "column",

  }
});
