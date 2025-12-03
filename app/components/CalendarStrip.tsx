import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CalendarStrip() {
  const today = new Date();

  // Generate 7 hari ke depan dimulai dari hari ini
  const next7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);

      return {
        fullDate: date,
        dayLabel: date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0),
        dateNumber: date.getDate(),
      };
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState(today.getDate());

  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 25 }}>
          {next7Days.map((item, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              {/* Label hari (M / T / W / ...) */}
              <Text style={{ fontSize: 14, color: "#ccc", marginBottom: 8 }}>{item.dayLabel}</Text>

              {/* Tanggal */}
              <TouchableOpacity
                onPress={() => setSelectedDate(item.dateNumber)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: item.dateNumber === selectedDate ? "#726e6eff" : "#eee",
                  // #1f1f1f
                }}
              >
                <Text
                  style={{
                    color: item.dateNumber === selectedDate ? "#fff" : "#333",
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
