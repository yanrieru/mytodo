import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useIntro from "../src/hooks/useIntro";
import { LanguageProvider } from "../src/locales/languange";
import { ThemeProvider } from "../src/theme/ThemeContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const { loading, isFirstLaunch } = useIntro();

  useEffect(() => {
    // AsyncStorage.removeItem("hasSeenIntro");
    if (!loading) {
      if (isFirstLaunch) router.replace("/intro");
    }
  }, [loading]);

  if (loading) return null;

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
