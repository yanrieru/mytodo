import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>&lt; Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 50 }} /> 
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>General</Text>

        <View style={styles.itemBox}>
          <Text style={styles.itemText}>Theme</Text>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemText}>Notifications</Text>
        </View>

        <View style={styles.itemBox}>
          <Text style={styles.itemText}>Language</Text>
        </View>
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
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },

  itemBox: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 25,
    marginBottom: 10,
  },

  itemText: {
    fontSize: 16,
  },
});
