import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../src/theme/ThemeContext";
import { useLanguage } from "../src/locales/languange";

export default function CalendarStrip() {
  const today = new Date();
  const { theme } = useTheme();
  const { lang } = useLanguage();

  const dayLabels = {
    en: ["S", "M", "T", "W", "T", "F", "S"],
    id: ["M", "S", "S", "R", "K", "J", "S"],
  };

  // Generate 7 hari ke depan
  const next7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);

      return {
        fullDate: date,
        dayLabel: dayLabels[lang][date.getDay()],
        dateNumber: date.getDate(),
      };
    });
  }, [lang]);

  const [selectedDate, setSelectedDate] = useState(today.getDate());

  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 25 }}>
          {next7Days.map((item, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 14, color: theme.text, marginBottom: 8 }}>{item.dayLabel}</Text>
            
              <TouchableOpacity
                onPress={() => setSelectedDate(item.dateNumber)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: item.dateNumber === selectedDate ? theme.primary : theme.card,
                  elevation: 1,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  shadowOffset: { width: 0, height: 1 },
                  // #1f1f1f
                }}
              >
                <Text
                  style={{
                    color: item.dateNumber === selectedDate ? theme.accent : theme.text,
                    fontWeight: "600",
                  }}
                >
                  {item.dateNumber}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
