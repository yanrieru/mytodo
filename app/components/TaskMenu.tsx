import { useEffect, useRef } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../src/theme/ThemeContext";
import { useLanguage } from "../src/locales/languange";

type TaskMenuProps = {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onToggleCompleted: () => void;
  completed: boolean;
};

export default function TaskMenu({ visible, onClose, onEdit, onToggleCompleted, completed }: TaskMenuProps) {
  const fade = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    if (visible) {
      Animated.timing(fade, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    } else {
      fade.setValue(0);
    }
  }, [visible]);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "flex-end",
    },
    menuBox: {
      backgroundColor: theme.card,
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
      color: theme.text,
      fontWeight: "500",
    },
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Animated.View style={[styles.overlay, { opacity: fade }]}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />

        <View style={styles.menuBox}>
          <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
            <Text style={styles.menuText}>{t("edit_task")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={onToggleCompleted}>
            <Text style={styles.menuText}>{completed ? t("mark_incomplete") : t("mark_completed")}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}
