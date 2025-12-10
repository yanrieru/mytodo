import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

export type ThemeMode = "light" | "dark" | "system";

export function useThemeSettings() {
  const deviceColorScheme = useColorScheme();
  const { setMode: setThemeProviderMode } = useTheme(); 
  const [mode, setMode] = useState<ThemeMode>("system");

  // load saved mode
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("THEME_MODE");

      if (saved === "light" || saved === "dark" || saved === "system") {
        applyTheme(saved as ThemeMode, false);
      }
    })();
  }, []);

  // apply theme mode
  const applyTheme = async (selectedMode: ThemeMode, save = true) => {
    setMode(selectedMode);

    if (save) {
      await AsyncStorage.setItem("THEME_MODE", selectedMode);
    }

    if (selectedMode === "light") {
      setThemeProviderMode("light");
    } else if (selectedMode === "dark") {
      setThemeProviderMode("dark");
    } else {
      setThemeProviderMode(deviceColorScheme === "dark" ? "dark" : "light");
    }
  };

  // Update if System mode & OS changes
  useEffect(() => {
    if (mode === "system") {
      setThemeProviderMode(deviceColorScheme === "dark" ? "dark" : "light");
    }
  }, [deviceColorScheme]);

  return {
    mode,
    setMode: applyTheme,
  };
}
