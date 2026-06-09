import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function HistoryScreen() {
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerHolder}>
          <View style={styles.userGreeting}>
            <Text style={styles.titleText}>HISTORY</Text>
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

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#a5a5a5", fontFamily: "SANSSULEX" }}>No history yet.</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c1013",
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.08,
  },
  headerHolder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: height * 0.02,
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
  userGreeting: {
    flexDirection: "column",
  }
});
