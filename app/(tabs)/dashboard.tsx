import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressRing from "@/app/components/ProgressRing";
import { useStepTracking } from "@/app/hooks/usePedometer";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useProfileStore } from "@/app/store/profileStore";
import Animated, { FadeInUp } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  const router = useRouter();
  const { steps, startTracking } = useStepTracking();
  const { profileImage, userName } = useProfileStore();

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    startTracking();
  }, [startTracking]);

  const goal = 10000;
  const distance = (steps * 0.000762).toFixed(1);
  const calories = Math.floor(steps * 0.04);
  const activeMin = Math.floor(steps / 100);
  const stepsLeft = Math.max(goal - steps, 0);
  const progressPercent = Math.floor((steps / goal) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image
            source={require("@/assets/images/Logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.header}>
          <View>
            <Text style={styles.titleText}>GOOD MORNING</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <View style={styles.profileContainer}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("@/assets/images/userProfile.png")
              }
              style={styles.profileImage}
            />
            <View style={styles.onlineBadge} />
          </View>
        </View>

        <Animated.View 
          entering={FadeInUp.delay(100).springify()} 
          style={styles.subheader}
        >
          <Text style={styles.subheaderText}>APEX PERFORMANCE</Text>
          <View style={styles.subheaderUnderline} />
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(150).springify()} 
          style={styles.progressContainer}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            }
          >
            <ProgressRing
              progress={Math.min(steps / goal, 1)}
              radius={110}
              strokeWidth={18}
              color="#c6ff00"
            >
              <View style={styles.ringContent}>
                <Text style={styles.ringStepsText}>
                  {steps.toLocaleString()}
                </Text>
                <Text style={styles.ringLabelText}>steps</Text>
                <Text style={styles.ringPercentText}>{progressPercent}%</Text>
              </View>
            </ProgressRing>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(200).springify()} 
          style={styles.dailyGoalCard}
        >
          <View style={styles.rowBetween}>
            <Text style={styles.cardLabel}>Daily Goal</Text>
            <Text style={styles.goalLeftText}>
              {stepsLeft.toLocaleString()} steps left
            </Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${Math.min(progressPercent, 100)}%` },
              ]}
            />
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.cardSubLabel}>0</Text>
            <Text style={styles.cardSubLabel}>10,000 steps</Text>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(250).springify()} 
          style={styles.metricsRow}
        >
          <View style={styles.metricCard}>
            <Ionicons
              name="location-outline"
              size={20}
              color="#c6ff00"
              style={styles.metricIcon}
            />
            <Text style={styles.metricValue}>{distance}</Text>
            <Text style={styles.metricUnit}>km</Text>
            <Text style={styles.metricLabel}>Distance</Text>
          </View>
          <View style={styles.metricCard}>
            <MaterialCommunityIcons
              name="fire"
              size={20}
              color="#ff6b00"
              style={styles.metricIcon}
            />
            <Text style={styles.metricValue}>{calories}</Text>
            <Text style={styles.metricUnit}>kcal</Text>
            <Text style={styles.metricLabel}>Calories</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#c6ff00"
              style={styles.metricIcon}
            />
            <Text style={styles.metricValue}>{activeMin}</Text>
            <Text style={styles.metricUnit}>min</Text>
            <Text style={styles.metricLabel}>Active</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.statusCard}>
          <View style={styles.statusLeft}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Pedometer Active</Text>
            <Text style={styles.statusSubText}>expo-sensors</Text>
          </View>
          <MaterialCommunityIcons name="waveform" size={24} color="#c6ff00" />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(350).springify()} style={styles.chartCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.chartTitle}>This Week</Text>
            <Text style={styles.chartSubtitle}>avg 8,308 steps</Text>
          </View>
          <View style={styles.chartBars}>
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => {
              let barStyle = styles.barEmpty;
              let textStyle = styles.barDayText;
              if (index === 4) {
                barStyle = styles.barActive;
                textStyle = styles.barDayTextActive;
              } else if (index === 2) {
                barStyle = styles.barPast;
              } else if (index < 4) {
                barStyle = styles.barOld;
              }

              return (
                <View key={index} style={styles.barColumn}>
                  <View style={styles.barBackground}>
                    <View style={barStyle} />
                  </View>
                  <Text style={textStyle}>{day}</Text>
                </View>
              );
            })}
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.8}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            router.push('/session');
          }}
        >
          <Ionicons name="play-outline" size={24} color="#000" />
          <Text style={styles.startButtonText}>Start New Session</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0c0f12" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10 },
  logoImage: { width: width * 0.5, height: height * 0.08, maxHeight: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: width * 0.04,
    textAlign: "left",
    color: "#a5a5a5",
    fontFamily: "Duitech",
  },
  userName: {
    textAlign: "left",
    fontSize: width * 0.07,
    color: "#70e000",
    fontFamily: "NettRanego",
  },
  profileContainer: { position: "relative" },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#333",
  },
  onlineBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#c6ff00",
    borderWidth: 2,
    borderColor: "#0c0f12",
  },
  subheader: { marginTop: 25 },
  subheaderText: {
    color: "#666",
    fontSize: 10,
    fontFamily: "Duitech",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  subheaderUnderline: {
    width: 30,
    height: 2,
    backgroundColor: "#c6ff00",
    marginTop: 4,
    borderRadius: 1,
  },

  progressContainer: { alignItems: "center", marginVertical: 40 },
  ringContent: { alignItems: "center", justifyContent: "center" },
  ringStepsText: {
    color: "#fff",
    fontSize: 44,
    fontFamily: "SANSSULEX",
    fontWeight: "bold",
  },
  ringLabelText: {
    color: "#666",
    fontSize: 14,
    fontFamily: "SANSSULEX",
    marginTop: -5,
    marginBottom: 5,
  },
  ringPercentText: {
    color: "#c6ff00",
    fontSize: 16,
    fontFamily: "SANSSULEX",
    fontWeight: "bold",
  },

  dailyGoalCard: {
    backgroundColor: "#15181b",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: { color: "#666", fontSize: 12, fontFamily: "SANSSULEX" },
  goalLeftText: {
    color: "#c6ff00",
    fontSize: 12,
    fontFamily: "SANSSULEX",
    fontWeight: "bold",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#25282c",
    borderRadius: 3,
    marginVertical: 12,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#c6ff00",
    borderRadius: 3,
  },
  cardSubLabel: { color: "#555", fontSize: 10, fontFamily: "SANSSULEX" },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  metricCard: {
    width: "31%",
    backgroundColor: "#15181b",
    borderRadius: 16,
    padding: 15,
  },
  metricIcon: { marginBottom: 10 },
  metricValue: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "SANSSULEX",
    fontWeight: "bold",
  },
  metricUnit: {
    color: "#666",
    fontSize: 12,
    fontFamily: "SANSSULEX",
    marginBottom: 5,
  },
  metricLabel: { color: "#555", fontSize: 11, fontFamily: "SANSSULEX" },

  statusCard: {
    flexDirection: "row",
    backgroundColor: "#15181b",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statusLeft: { flexDirection: "row", alignItems: "center" },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#c6ff00",
    marginRight: 10,
    shadowColor: "#c6ff00",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "SANSSULEX",
    fontWeight: "bold",
    marginRight: 8,
  },
  statusSubText: { color: "#555", fontSize: 12, fontFamily: "SANSSULEX" },

  chartCard: {
    backgroundColor: "#15181b",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  chartTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "SANSSULEX",
    fontWeight: "bold",
  },
  chartSubtitle: { color: "#666", fontSize: 12, fontFamily: "SANSSULEX" },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "flex-end",
    height: 60,
  },
  barColumn: { alignItems: "center", width: "12%" },
  barBackground: {
    height: 40,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  barOld: {
    width: "100%",
    height: 20,
    backgroundColor: "#25282c",
    borderRadius: 6,
  },
  barPast: {
    width: "100%",
    height: 30,
    backgroundColor: "#506b12",
    borderRadius: 6,
  },
  barActive: {
    width: "100%",
    height: 35,
    backgroundColor: "#c6ff00",
    borderRadius: 6,
    shadowColor: "#c6ff00",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },
  barEmpty: {
    width: "100%",
    height: 2,
    backgroundColor: "#25282c",
    borderRadius: 2,
  },
  barDayText: {
    color: "#555",
    fontSize: 10,
    fontFamily: "Duitech",
    marginTop: 10,
  },
  barDayTextActive: {
    color: "#c6ff00",
    fontSize: 10,
    fontFamily: "Duitech",
    marginTop: 10,
    fontWeight: "bold",
  },

  startButton: {
    backgroundColor: "#c6ff00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 20,
  },
  startButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "SANSSULEX",
    fontWeight: "bold",
    marginLeft: 10,
  },
  totalStepsLabel: {
    color: "#a5a5a5",
    fontSize: 14,
    fontFamily: "Duitech",
    marginBottom: 5,
  },
  totalStepsValue: {
    color: "#70e000",
    fontSize: 28,
    fontFamily: "SANSSULEX",
  },
});
