import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View
      style={{
        marginTop: 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          borderRadius: 25,
          paddingHorizontal: 15,
          height: 48,
        }}
      >
        <Ionicons name="search" size={20} color="#888" />

        <TextInput
          placeholder="Search task..."
          placeholderTextColor="#888"
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: "#2b2121ff",
          }}
        />
      </View>
    </View>
  );
}
