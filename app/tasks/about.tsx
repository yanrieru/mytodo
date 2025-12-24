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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>⟨ {t("back")}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t("about_app")}</Text>
        <View style={{ width: 50 }} />
      </View>
     
      <View style={styles.content}>
        <View style={styles.doodleContainer}>
          <Image source={require("../../assets/images/stikers.gif")} style={{ width: 120, height: 120, resizeMode: "contain", marginBottom: 10 }} />
          <Text style={styles.appName}>MyTodo</Text>
          <Text style={styles.tagline}>{t("tagline")}</Text>
        </View>
       
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("what_is_mytodo")}</Text>
          <Text style={styles.cardText}>{t("description1")}</Text>
        </View>
      
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("why_built")}</Text>
          <Text style={styles.cardText}>{t("description2")}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("made_with")}</Text>
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
