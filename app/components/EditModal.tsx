import { useEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type EditModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (newTitle: string) => void;
  initialTitle: string;
};

export default function EditModal({ visible, onClose, onSave, initialTitle }: EditModalProps) {
  const [text, setText] = useState(initialTitle);
  const slide = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    setText(initialTitle);

    if (visible) {
      Animated.timing(slide, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      slide.setValue(300);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />

        <Animated.View style={[styles.box, { transform: [{ translateY: slide }] }]}>
          <Text style={styles.label}>Edit Task</Text>

          <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Task title…" />

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.save}
              onPress={() => {
                if (text.trim()) onSave(text.trim());
              }}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)", // lebih gelap
    justifyContent: "flex-end",
  },

  box: {
    backgroundColor: "#fff", 
    padding: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  label: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#7c7f81ff", 
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#fff",
    marginBottom: 25,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancel: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },

  save: {
    flex: 1,
    backgroundColor: "#9b5de5", 
    paddingVertical: 12,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
