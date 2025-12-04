import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* BACKDROP */}
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

      {/* MODAL CONTENT */}
      <View style={styles.modalContainer}>
        {/* CLOSE BUTTON */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Calendar</Text>

        <Calendar
          onDayPress={(day) => {
            console.log("Selected:", day.dateString);
          }}
          style={styles.calendar}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },

  closeButton: {
    position: "absolute",
    right: 15,
    top: 5,
    padding: 1,
  },

  closeText: {
    fontSize: 32,
    fontWeight: "600",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  calendar: {
    borderRadius: 10,
    elevation: 3,
  },
});
