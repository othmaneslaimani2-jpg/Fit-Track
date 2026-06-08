import { Text, View, Image, StyleSheet } from "react-native";
import "@/global.css"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#051d2d',
      }}
    >
      <View>
<Image source={require("@/assets/images/Logo.png")} style={styles.logoImage} resizeMode="contain" />
      <Text className="text-4xl text-center font-bold text-sky-400">Edit app/index.tsx to edit this screen.</Text>
      </View>
      </View>
    
  );
}


const styles = StyleSheet.create({
logoImage: {
    width: 200,
    height: 50,
  },
})