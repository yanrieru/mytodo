import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header({
  onMenuPress,
  onCalendarPress,
}: {
  onMenuPress: () => void;
  onCalendarPress: () => void;
}) {
  const date = new Date();

  // list nama hari & bulan
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNumber = date.getDate();

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#54504F",
      }}
    >
      {/* LEFT SECTION */}
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={onMenuPress}>
          <Ionicons name="menu" size={30} color="#ffffff" />
        </TouchableOpacity>

        <Text style={{ fontSize: 30, fontWeight: "400", color: "#ffffff" }}>
          Today’s
        </Text>
        <Text style={{ fontSize: 40, fontWeight: "800", color: "#ffffff" }}>
          Schedule
        </Text>

        {/* Tanggal otomatis */}
        <Text style={{ fontSize: 18, color: "#ffffff", marginTop: 20 }}>
          {dayName}, {monthName} {dayNumber}
        </Text>
      </View>

      {/* CALENDAR BUTTON */}
      <TouchableOpacity style={{ marginTop: 4 }} onPress={onCalendarPress}>
        <Ionicons name="calendar-outline" size={30} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
