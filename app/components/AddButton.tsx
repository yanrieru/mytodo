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
        <Ionicons name="add" size={32} color="#fff" />
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
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
});
