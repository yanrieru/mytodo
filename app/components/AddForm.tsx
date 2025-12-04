import { useEffect, useRef, useState } from "react";
import { Animated, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface AddFormProps {
  open: boolean;
  keyboardOffset: Animated.Value;
  onSubmit: (title: string, time: string) => void; // ⬅ kirim ke parent
}

export default function AddForm({ open, keyboardOffset, onSubmit }: AddFormProps) {
  const slideAnim = useRef(new Animated.Value(250)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState("");

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
      ]).start(() => {
        inputRef.current?.focus();
      });
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
        setText(""); // reset input saat panel tertutup
      });
    }
  }, [open]);

  const sendTask = () => {
    if (!text.trim()) return;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const autoTime = `${hours}:${minutes}`;

    onSubmit(text.trim(), autoTime); // kirim ke index.tsx
    setText("");
    Keyboard.dismiss();
  };

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            ref={inputRef}
            placeholder="Tambah task…"
            placeholderTextColor="#999"
            style={styles.input}
            value={text}
            onChangeText={setText}
            onSubmitEditing={sendTask} // ENTER untuk kirim
          />

          {/* TOMBOL ADD */}
          {/* <TouchableOpacity style={styles.addBtn} onPress={sendTask}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity> */}
        </View>
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
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
