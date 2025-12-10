import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../../src/locales/languange";
import { useTheme } from "../../src/theme/ThemeContext";

export default function About() {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    header: {
      paddingTop: 55,
      paddingBottom: 18,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    back: {
      fontSize: 18,
      color: theme.primary,
      fontWeight: "600",
    },

    title: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "700",
    },

    content: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },

    doodleContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 25,
    },

    // doodle: {
    //   fontSize: 60,
    //   marginBottom: 10,
    // },

    appName: {
      color: theme.text,
      fontSize: 30,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: 10,
    },

    tagline: {
      fontSize: 16,
      textAlign: "center",
      color: theme.subtext,
      marginBottom: 30,
    },

    card: {
      padding: 18,
      borderRadius: 15,
      backgroundColor: theme.card,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 2 },
      marginBottom: 18,
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 6,
    },

    cardText: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.subtext,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>⟨ {t("back")}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t("about_app")}</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Doodle Icon */}
        <View style={styles.doodleContainer}>
          <Image source={require("../../assets/images/stikers.gif")} style={{ width: 120, height: 120, resizeMode: "contain", marginBottom: 10 }} />
          <Text style={styles.appName}>MyTodo</Text>
          <Text style={styles.tagline}>Organize your day. Boost your productivity.</Text>
        </View>

        {/* Card 1 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is MyTodo?</Text>
          <Text style={styles.cardText}>MyTodo is a simple and modern task manager built with React Native + Expo. It helps you stay organized with clean UI, daily reminders, task filtering, and quick editing.</Text>
        </View>

        {/* Card 2 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Why Built It</Text>
          <Text style={styles.cardText}>Taskly focuses on simplicity no distractions, just your tasks. Our goal is to help you maintain a productive and stress free workflow.</Text>
        </View>

        {/* Card 3 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Made With</Text>
          <Text style={styles.cardText}>
            ⚡ React Native{`\n`}
            🚀 Expo Router{`\n`}
            🎨 Custom Light & Dark Theme{`\n`}
            🌍 Multi-language Support
          </Text>
        </View>
      </View>
    </View>
  );
}
