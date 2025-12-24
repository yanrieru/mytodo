import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useIntro() {
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const seen = await AsyncStorage.getItem("hasSeenIntro");
        setIsFirstLaunch(seen === null);
      } catch (err) {
        console.warn("useIntro read error:", err);
        setIsFirstLaunch(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, isFirstLaunch };
}
