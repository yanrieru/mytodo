import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

type TaskItemProps = {
  time: string;
  title: string;
  completed?: boolean;
};

export default function TaskItem({ time, title }: TaskItemProps) {
  const renderRightActions = () => (
    <View style={styles.rightContainer}>
      <TouchableOpacity style={styles.deleteBox}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable overshootRight={false} renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={22} color="#ccc" />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#726e6eff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  time: {
    color: "#eee",
    fontSize: 13,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
    fontWeight: "500",
  },

  rightContainer: {
    justifyContent: "center",
    marginBottom: 12,
  },

  deleteBox: {
    backgroundColor: "#9b5de5",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 15,
  },
});
