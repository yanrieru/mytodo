import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function IntroPage() {
  const router = useRouter();

  const finishIntro = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true");
    router.replace("/"); 
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/mytodointro.png")} style={styles.image} />

      <Text style={styles.title}>Time to List with MyTodo</Text>
      <Text style={styles.description}>Manage your daily tasks easily and efficiently</Text>

      <TouchableOpacity style={styles.button} onPress={finishIntro}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  image: { width: 350, height: 350, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 10 },
  description: { fontSize: 16, opacity: 0.7, textAlign: "center", marginBottom: 30 },
  button: {
    backgroundColor: "#3e88ddff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
