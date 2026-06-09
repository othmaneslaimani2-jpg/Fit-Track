import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SessionScreen() {
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.content}>
        

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#a5a5a5", fontFamily: "SANSSULEX" }}>Ready to start.</Text>
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
});
