import React from "react";
import { Dimensions, Image, StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";
import Animated, { SlideInRight } from "react-native-reanimated";
import { useProfileStore } from "@/app/store/profileStore";
import { useSessionStore, SessionData } from "@/app/store/sessionStore";

const { width } = Dimensions.get("window");

export default function HistoryScreen() {
  const { profileImage, setProfileImage, userName } = useProfileStore();
  const { sessions } = useSessionStore();

  const pickImage = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setProfileImage(uri);
      }
    } catch (e) {
      console.error("Failed to pick image", e);
    }
  };

  const renderItem = ({ item, index }: { item: SessionData, index: number }) => (
    <Animated.View 
      entering={SlideInRight.delay(index * 100).springify()}
      style={styles.historyCard}
    >
      <View style={styles.cardHeader}>
        <View style={styles.dateTypeContainer}>
          <Text style={styles.cardDate}>{item.date}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
      
      <View style={styles.metricsContainer}>
        <View style={styles.metric}>
          <Ionicons name="location-outline" size={18} color="#c6ff00" style={styles.metricIcon} />
          <Text style={styles.metricValue}>{item.distance}</Text>
          <Text style={styles.metricLabel}>km</Text>
        </View>
        <View style={styles.metric}>
          <MaterialCommunityIcons name="shoe-print" size={18} color="#c6ff00" style={styles.metricIcon} />
          <Text style={styles.metricValue}>{item.steps}</Text>
          <Text style={styles.metricLabel}>steps</Text>
        </View>
        <View style={styles.metric}>
          <MaterialCommunityIcons name="fire" size={18} color="#ff6b00" style={styles.metricIcon} />
          <Text style={styles.metricValue}>{item.calories}</Text>
          <Text style={styles.metricLabel}>kcal</Text>
        </View>
        <View style={styles.metric}>
          <Ionicons name="time-outline" size={18} color="#c6ff00" style={styles.metricIcon} />
          <Text style={styles.metricValue}>{item.time}</Text>
          <Text style={styles.metricLabel}>min</Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerHolder}>
        <View style={styles.userGreeting}>
          <Text style={styles.titleText}>ACTIVITY</Text>
          <Text style={styles.userName}>HISTORY</Text>
        </View>
        <View style={styles.profileContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
            <Image
              source={profileImage ? { uri: profileImage } : require("@/assets/images/userProfile.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {sessions.length > 0 ? (
        <FlatList
          data={sessions}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No history yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f12",
  },
  headerHolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  userGreeting: {
    flexDirection: "column",
  },
  titleText: {
    fontSize: width * 0.04,
    color: "#a5a5a5",
    fontFamily: 'Duitech',
  },
  userName: {
    fontSize: width * 0.07,
    color: "#70e000",
    fontFamily: 'NettRanego',
  },
  profileContainer: {
    position: "relative",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#333",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  historyCard: {
    backgroundColor: "#15181b",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dateTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDate: {
    color: "#fff",
    fontFamily: "SANSSULEX",
    fontSize: 16,
    marginRight: 10,
  },
  typeBadge: {
    backgroundColor: "rgba(198, 255, 0, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    color: "#c6ff00",
    fontFamily: "Duitech",
    fontSize: 10,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0c0f12",
    borderRadius: 12,
    padding: 15,
  },
  metric: {
    alignItems: "center",
    width: '22%',
  },
  metricIcon: {
    marginBottom: 6,
  },
  metricValue: {
    color: "#fff",
    fontFamily: "SANSSULEX",
    fontSize: 14,
    fontWeight: "bold",
  },
  metricLabel: {
    color: "#666",
    fontFamily: "Duitech",
    fontSize: 10,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#a5a5a5",
    fontFamily: "SANSSULEX",
    fontSize: 16,
  },
});
