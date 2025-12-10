import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../../src/locales/languange";
import { useTheme } from "../../src/theme/ThemeContext";

export default function Header({ onMenuPress, onCalendarPress }: { onMenuPress: () => void; onCalendarPress: () => void }) {
  const date = new Date();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const days = t("days");
  const months = t("months");

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNumber = date.getDate();
  const year = date.getFullYear();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: theme.background,
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={onMenuPress}>
          <Ionicons name="menu" size={30} color={theme.text} />
        </TouchableOpacity>

        <Text style={{ fontSize: 30, fontWeight: "400", color: theme.text }}>{t("today")}</Text>
        <Text style={{ fontSize: 40, fontWeight: "800", color: theme.text }}>{t("activities")}</Text>

        <Text style={{ fontSize: 18, color: theme.text, marginTop: 20 }}>
          {dayName}, {dayNumber} {monthName} {year}
        </Text>
      </View>

      <TouchableOpacity style={{ marginTop: 4 }} onPress={onCalendarPress}>
        <Ionicons name="calendar-outline" size={30} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
}
