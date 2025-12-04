import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useRef, useEffect } from "react";

type TaskMenuProps = {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onToggleCompleted: () => void;
  completed: boolean;
};

export default function TaskMenu({
  visible,
  onClose,
  onEdit,
  onToggleCompleted,
  completed,
}: TaskMenuProps) {

  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fade, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    } else {
      fade.setValue(0);
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Animated.View style={[styles.overlay, { opacity: fade }]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />

        <View style={styles.menuBox}>
          <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
            <Text style={styles.menuText}>Edit Task</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onToggleCompleted}>
            <Text style={styles.menuText}>
              {completed ? "Mark as Incomplete" : "Mark as Completed"}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  menuBox: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingVertical: 8,
    elevation: 10,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 17,
    color: "#333",
    fontWeight: "500",
  },
});
