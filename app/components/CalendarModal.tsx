import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useLanguage } from "../../src/locales/languange";
import { useTheme } from "../../src/theme/ThemeContext";

export default function CalendarModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { theme } = useTheme();
  const { t, lang } = useLanguage();

  LocaleConfig.locales["id"] = {
    monthNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    dayNames: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    dayNamesShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    today: "Hari ini",
  };

  LocaleConfig.locales["en"] = {
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "Today",
  };
  
  LocaleConfig.defaultLocale = lang;

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
      backgroundColor: theme.background,
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
      color: theme.text,
    },

    title: {
      color: theme.text,
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 10,
    },

    calendar: {
      borderRadius: 10,
      elevation: 2,
    },
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t("calendar")}</Text>

        <Calendar
          onDayPress={(day) => {
            console.log("Selected:", day.dateString);
          }}
          style={styles.calendar}
          theme={{
            todayTextColor: theme.primary,
            arrowColor: theme.text,
            monthTextColor: theme.text,
            textSectionTitleColor: theme.text,
            calendarBackground: theme.background,
            dayTextColor: theme.text,
          }}
        />
      </View>
    </Modal>
  );
}
