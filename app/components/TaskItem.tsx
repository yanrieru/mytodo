import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import TaskMenu from "./TaskMenu";

type TaskItemProps = {
  id: string;
  time: string;
  title: string;
  completed: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleCompleted: (id: string) => void;
};

export default function TaskItem({ id, time, title, completed, onDelete, onEdit, onToggleCompleted }: TaskItemProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const renderRightActions = () => (
    <View style={styles.deleteWrapper}>
      <TouchableOpacity style={styles.deleteBox} onPress={() => onDelete(id)}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={styles.wrapper}>
        <Swipeable overshootRight={false} renderRightActions={renderRightActions}>
          <View style={styles.container}>
            <View>
              <Text style={styles.time}>{time}</Text>
              <Text style={[styles.title, completed && styles.completed]}>{title}</Text>
            </View>

            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Ionicons name="ellipsis-vertical" size={22} color="#ccc" />
            </TouchableOpacity>
          </View>
        </Swipeable>
      </View>

      <TaskMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onEdit={() => {
          setMenuVisible(false);
          onEdit(id);
        }}
        onToggleCompleted={() => {
          setMenuVisible(false);
          onToggleCompleted(id);
        }}
        completed={completed}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 15,
    overflow: "hidden", //  ⬅ ini yang bikin kedua box menyatu!
    marginBottom: 12,
  },

  container: {
    backgroundColor: "#6E7070",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  deleteBox: {
    backgroundColor: "#9b5de5",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%", //  ⬅ agar tingginya selalu sama dengan task box
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

  completed: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
});
