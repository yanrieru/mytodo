import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../src/theme/ThemeContext";
import { useLanguage } from "../src/locales/languange";

export default function About() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background},

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
    color: theme.text,
    fontSize: 20,
    fontWeight: "700",
  },
  
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  appName: {
    color: theme.text,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 22,
    color: theme.text,
    marginBottom: 30,
  },
});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>&lt; {t("back")}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t("about_app")}</Text>
        <View style={{ width: 50 }} />
      </View>
 
      <View style={styles.content}>
        <Text style={styles.appName}>Taskly App</Text>

        <Text style={styles.description}>A simple and modern task management app built with React Native + Expo. Helps you organize daily tasks, track schedules, and stay productive.</Text>
      </View>
    </View>
  );
}