import { Ionicons } from "@expo/vector-icons";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

export default function AddButton({ onPress, keyboardOffset }: { onPress: () => void; keyboardOffset: Animated.Value }) {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: Animated.add(25, keyboardOffset),
        },
      ]}
    >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name="add" size={32} color="#000" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 25,
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00D1FF",
    justifyContent: "center",
    alignItems: "center",

    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});
