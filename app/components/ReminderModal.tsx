import { useEffect, useRef, useState } from "react";
import { Alert, Animated, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../../src/locales/languange";
import { scheduleTaskReminder } from "../../src/notifications/scheduleTaskReminder";
import { useTheme } from "../../src/theme/ThemeContext";

type ReminderModalProps = {
  visible: boolean;
  onClose: () => void;
  reminderDate: string;
  setReminderDate: (text: string) => void;
  onReminderSaved?: () => void;
};

export default function ReminderModal({ visible, onClose, reminderDate, setReminderDate, onReminderSaved }: ReminderModalProps) {
  const slide = useRef(new Animated.Value(300)).current;
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

  const handleSave = async () => {
    if (!reminderDate.trim()) {
      Alert.alert(t("error"), t("reminder_empty") ?? "Tanggal reminder tidak boleh kosong.");
      return;
    }

    const isoString = reminderDate.replace(" ", "T"); // "YYYY-MM-DDTHH:MM"
    const parsedDate = new Date(isoString);

    if (isNaN(parsedDate.getTime())) {
      Alert.alert(t("error"), t("reminder_invalid") ?? "Format tanggal tidak valid. Gunakan: YYYY-MM-DD HH:MM");
      return;
    }

    if (parsedDate.getTime() <= Date.now()) {
      Alert.alert(t("error"), t("reminder_invalid") ?? "Waktu reminder harus di masa depan.");
      return;
    }

    try {
      setLoading(true);
      await scheduleTaskReminder("Task Reminder", parsedDate);

      setLoading(false);
      Alert.alert(t("success"), t("reminder_set") ?? "Reminder berhasil dibuat!");
      onReminderSaved && onReminderSaved();
      onClose();
    } catch (e) {
      setLoading(false);
      console.error("Schedule Reminder Error:", e);
      Alert.alert(t("error"), t("reminder_failed") ?? "Gagal membuat reminder.");
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.45)",
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
    inputLabel: {
      color: theme.subtext,
      fontSize: 14,
      marginBottom: 8,
      marginLeft: 5,
    },
    input: {
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 14,
      fontSize: 16,
      color: theme.text,
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
      opacity: loading ? 0.6 : 1,
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
            <Text style={styles.label}>{t("set_reminder")}</Text>

            <Text style={styles.inputLabel}>{t("reminder_date_label") ?? "Reminder Date & Time"}</Text>

            <TextInput style={styles.input} placeholder="YYYY-MM-DD HH:MM" placeholderTextColor={theme.subtext} value={reminderDate} onChangeText={setReminderDate} editable={!loading} />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.cancel} onPress={onClose} disabled={loading}>
                <Text style={styles.cancelText}>{t("cancel")}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.save} onPress={handleSave} disabled={loading}>
                <Text style={styles.saveText}>{loading ? (t("saving") ?? "Saving...") : t("save")}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
