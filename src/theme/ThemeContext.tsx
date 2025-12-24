import React, { createContext, useContext, useState, useEffect } from "react";
import { themes, ThemeType } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark";

type ThemeContextProps = {
  mode: ThemeMode;
  theme: ThemeType;
  setMode: (mode: ThemeMode) => void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<ThemeMode>("light");

  useEffect(() => {
    async function loadTheme() {
      const saved = await AsyncStorage.getItem("APP_THEME");
      if (saved === "light" || saved === "dark") {
        setModeState(saved);
      }
    }
    loadTheme();
  }, []);

  const setMode = async (mode: ThemeMode) => {
    setModeState(mode);
    await AsyncStorage.setItem("APP_THEME", mode);
  };

  return (
    <ThemeContext.Provider value={{ mode, theme: themes[mode], setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
