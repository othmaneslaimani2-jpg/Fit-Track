import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
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
        <Text style={styles.titleText}>
          Edit app/index.tsx to edit this screen.
        </Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c1013ff',
  },
  header: {
    width: width,
    alignItems: 'center',
    paddingTop: height * 0.06,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  logoImage: {
    width: width * 0.5,
    height: height * 0.08,
    maxHeight: 60,
  },
  titleText: {
    fontSize: width * 0.08,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#38bdf8',
  },
});