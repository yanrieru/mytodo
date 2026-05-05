import { useEffect, useRef, useState } from "react";
import { Animated, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../../src/locales/languange";
import { useTheme } from "../../src/theme/ThemeContext";

type EditTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (newTitle: string) => void;
  initialTitle: string;
};

export default function EditTaskModal({ visible, onClose, onSave, initialTitle }: EditTaskModalProps) {
  const [text, setText] = useState(initialTitle);
  const slide = useRef(new Animated.Value(300)).current;
  const { theme } = useTheme();
  const { t } = useLanguage();

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

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      justifyContent: "flex-end",
    },

    box: {
      backgroundColor: theme.background,
      padding: 25,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },

    label: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 20,
    },

    input: {
      backgroundColor: theme.card,
      borderRadius: 20,
      padding: 14,
      fontSize: 16,
      color: theme.subtext,
      marginBottom: 25,
      elevation: 1,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 1,
      shadowOffset: { width: 0, height: 1 },
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
      backgroundColor: theme.card,
      justifyContent: "center",
      alignItems: "center",
      elevation: 1,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 1,
      shadowOffset: { width: 0, height: 1 },
    },

    cancelText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "500",
    },

    save: {
      flex: 1,
      backgroundColor: theme.primary,
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

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={styles.overlay}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />

          <Animated.View style={[styles.box, { transform: [{ translateY: slide }] }]}>
            <Text style={styles.label}>{t("edit_task")}</Text>

            <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Task title…" placeholderTextColor={theme.subtext} />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.cancel} onPress={onClose}>
                <Text style={styles.cancelText}>{t("cancel")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.save}
                onPress={() => {
                  if (text.trim()) onSave(text.trim());
                }}
              >
                <Text style={styles.saveText}>{t("save")}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
