import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useLanguage } from "../../src/locales/languange";
import { useTheme } from "../../src/theme/ThemeContext";
import { useThemeSettings } from "../../src/theme/useThemeSettings";

export default function Settings() {
  const router = useRouter();
  const { theme } = useTheme();
  const { mode, setMode } = useThemeSettings();
  const { lang, setLang, t } = useLanguage();

  // dropdown theme
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownHeight = useSharedValue(0);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    dropdownHeight.value = withTiming(dropdownOpen ? 0 : 50, { duration: 250 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: dropdownHeight.value,
    opacity: dropdownHeight.value === 0 ? 0 : 1,
  }));

  // dropdown language
  const [langOpen, setLangOpen] = useState(false);
  const langHeight = useSharedValue(0);

  const toggleLangDropdown = () => {
    setLangOpen(!langOpen);
    langHeight.value = withTiming(langOpen ? 0 : 100, { duration: 250 });
  };

  const langAnimatedStyle = useAnimatedStyle(() => ({
    height: langHeight.value,
    opacity: langHeight.value === 0 ? 0 : 1,
  }));

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    header: {
      paddingTop: 60,
      paddingBottom: 20,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    back: { fontSize: 18, color: "#007AFF", fontWeight: "600" },
    title: { color: theme.text, fontSize: 20, fontWeight: "700" },
    content: { paddingHorizontal: 20, marginTop: 10 },
    itemBox: {
      backgroundColor: theme.card,
      padding: 16,
      borderRadius: 25,
      marginBottom: 20,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 2 },
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    itemText: { color: theme.text, fontSize: 16 },
    dropdownItem: { paddingVertical: 12, justifyContent: "center" },
    dropdownText: { color: theme.text, fontSize: 16 },
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>&lt; {t("back")}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t("settings")}</Text>

        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        {/* THEME */}
        <View style={styles.itemBox}>
          <View style={styles.row}>
            <Text style={styles.itemText}>{t("light")}</Text>
            <Switch value={mode === "light"} onValueChange={() => setMode("light")} />
          </View>

          <View style={styles.row}>
            <Text style={styles.itemText}>{t("dark")}</Text>
            <Switch value={mode === "dark"} onValueChange={() => setMode("dark")} />
          </View>

          <TouchableOpacity onPress={toggleDropdown}>
            <View style={styles.row}>
              <Text style={styles.itemText}>{t("system")}</Text>
              <Text style={[styles.itemText, { opacity: 0.6 }]}>{mode === "system" ? t("system_selected") : t("manual")}</Text>
            </View>
          </TouchableOpacity>

          <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setMode("system");
                toggleDropdown();
              }}
            >
              <Text style={styles.dropdownText}>{t("use_system")}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.itemBox}>
          <TouchableOpacity onPress={toggleLangDropdown}>
            <View style={styles.row}>
              <Text style={styles.itemText}>{t("language")}</Text>
              <Text style={[styles.itemText, { opacity: 0.6 }]}>{lang.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>

          <Animated.View style={[langAnimatedStyle, { overflow: "hidden" }]}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setLang("en");
                toggleLangDropdown();
              }}
            >
              <Text style={styles.dropdownText}>{t("english")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setLang("id");
                toggleLangDropdown();
              }}
            >
              <Text style={styles.dropdownText}>{t("indonesia")}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
