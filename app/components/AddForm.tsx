import { useEffect, useRef } from "react";
import { Animated, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";

export default function AddForm({ open, keyboardOffset }: { open: boolean; keyboardOffset: Animated.Value }) {
  const slideAnim = useRef(new Animated.Value(250)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const inputRef = useRef<TextInput>(null);
  
  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 40,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 30,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start(() => {
        Keyboard.dismiss();
      });
    }
  }, [open]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        style={[
          styles.formPanel,
          {
            right: slideAnim,
            opacity: opacityAnim,
            bottom: Animated.add(keyboardOffset, new Animated.Value(25)),
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          placeholder="Tambah task…"
          placeholderTextColor="#999"
          style={styles.input}
          onFocus={() => {
            // keyboard muncul → naik otomatis
          }}
          onBlur={() => {
            // keyboard hilang → turun otomatis
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  formPanel: {
    position: "absolute",
    width: 350,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    justifyContent: "center",

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  input: {
    fontSize: 16,
    color: "#000",
  },
});
