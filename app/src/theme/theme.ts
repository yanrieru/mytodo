// src/theme/theme.ts

export const lightTheme = {
  background: "#f5f5f5",
  card: "#ffffff",
  text: "#000000",
  subtext: "#444444",
  primary: "#4A90E2",
  accent: "#54504F",
};

export const darkTheme = {
  background: "#54504F",
  card: "#6e7070ff",
  text: "#ffffff",
  subtext: "#dddddd",
  primary: "#4A90E2",
  accent: "#ffffff",
};

export type ThemeType = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
