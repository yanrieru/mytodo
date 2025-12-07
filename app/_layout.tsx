import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LanguageProvider } from "./src/locales/languange";
import { ThemeProvider } from "./src/theme/ThemeContext";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}
