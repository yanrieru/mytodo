import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header() {
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
        {/* Menu */}
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <Ionicons name="menu" size={30} color="#ffffff" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={{ fontSize: 30, fontWeight: "400", color: "#ffffff" }}>Today’s</Text>
        <Text style={{ fontSize: 40, fontWeight: "700", color: "#ffffff" }}>Schedule</Text>

        {/* Subtitle / Date */}
        <Text style={{ fontSize: 18, color: "#ffffff", marginTop: 20 }}>Monday, December 1</Text>
      </View>

      {/* RIGHT SECTION (Calendar Icon) */}
      <TouchableOpacity style={{ marginTop: 4 }}>
        <Ionicons name="calendar-outline" size={30} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
