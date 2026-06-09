import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
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
              width: 70,
              height: 70,
              borderRadius: 50,
              justifyContent: "flex-start",
            }}
            resizeMode="contain"
          />
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
  },
  logoImage: {
    width: width * 0.5,
    height: height * 0.08,
    maxHeight: 60,
  },
  titleText: {
    fontSize: width * 0.04,
    textAlign: "center",
    fontWeight: "bold",
    color: "#a5a5a5",
  },
  userName: {
    textAlign: "left",
    fontSize: width * 0.06,
    color: "#70e000",
    fontWeight: "bold"

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
