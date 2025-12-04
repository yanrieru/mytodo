import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function About() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>&lt; Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>About App</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.appName}>Taskly App</Text>

        <Text style={styles.description}>A simple and modern task management app built with React Native + Expo. Helps you organize daily tasks, track schedules, and stay productive.</Text>

        {/* <Text style={styles.footerText}>Developed with ❤️ by AprlynCndrau</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "600",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  appName: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
    marginBottom: 30,
  },

  version: {
    fontSize: 16,
    color: "#777",
  },

  footerText: {
    marginTop: 40,
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
});
