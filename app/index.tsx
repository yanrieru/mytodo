import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "../src/theme/ThemeContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AddButton from "./components/AddButton";
import AddForm from "./components/AddForm";
import CalendarModal from "./components/CalendarModal";
import CalendarStrip from "./components/CalendarStrip";
import EditModal from "./components/EditModal";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/SideBar";
import TaskItem from "./components/TaskItem";

import ReminderModal from "./components/ReminderModal";
import { scheduleTaskReminder } from "../src/notifications/scheduleTaskReminder";

function getCurrentTime() {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes().toString().padStart(2, "0");

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour}:${minute} ${ampm}`;
}

export default function Home() {
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [tasks, setTasks] = useState<
    { id: string; title: string; time: string; completed: boolean }[]
  >([]);

  const [reminderVisible, setReminderVisible] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [selectedReminderTask, setSelectedReminderTask] = useState(null);

  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // Load tasks
  useEffect(() => {
    async function loadTasks() {
      const saved = await AsyncStorage.getItem("TASKS");
      if (saved) setTasks(JSON.parse(saved));
    }
    loadTasks();
  }, []);
 
  useEffect(() => {
    AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(keyboardOffset, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  
  // Add task
  const handleAddTask = (text: string) => {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: text,
      time: getCurrentTime(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setOpen(false);
    Keyboard.dismiss();
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
  
  // Edit Task
  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditVisible(true);
  };

  const closeEditModal = () => {
    setEditVisible(false);
    setSelectedTask(null);
  };

  const handleSaveEdit = (id: string, newTitle: string) => {
    editTask(id, newTitle);
    closeEditModal();
  };
 
  // Set Reminder
  const handleSetReminder = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    setSelectedReminderTask(task);
    setReminderVisible(true);
  };

  const handleSaveReminder = async () => {
    if (!selectedReminderTask) return;

    try {
      const date = new Date(reminderDate);
      await scheduleTaskReminder(selectedReminderTask.title, date);
    } catch (e) {
      console.log("Invalid Date", e);
    }

    setReminderVisible(false);
    setReminderDate("");
    setSelectedReminderTask(null);
  };

  // Filter search
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Header
            onMenuPress={() => setSidebarOpen(true)}
            onCalendarPress={() => setCalendarVisible(true)}
          />

          <CalendarModal
            visible={calendarVisible}
            onClose={() => setCalendarVisible(false)}
          />
          <CalendarStrip />

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </View>
      </TouchableWithoutFeedback>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 0, paddingHorizontal: 20 }}>
          {searchQuery.length > 0 && filteredTasks.length === 0 && (
            <Text
              style={{
                marginTop: 40,
                textAlign: "center",
                fontSize: 16,
                color: theme.subtext,
              }}
            >
              No Results Found
            </Text>
          )}

          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              time={task.time}
              title={task.title}
              completed={task.completed}
              onEdit={() => openEditModal(task)}
              onToggleCompleted={() => toggleComplete(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
              onSetReminder={handleSetReminder}
            />
          ))}
        </View>
      </ScrollView>
      
      {selectedTask && (
        <EditModal
          visible={editVisible}
          onClose={closeEditModal}
          initialTitle={selectedTask.title}
          onSave={(newTitle) => handleSaveEdit(selectedTask.id, newTitle)}
        />
      )}
     
      <ReminderModal
        visible={reminderVisible}
        onClose={() => setReminderVisible(false)}
        onSave={handleSaveReminder}
        reminderDate={reminderDate}
        setReminderDate={setReminderDate}
      />

      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <AddForm
        open={open}
        keyboardOffset={keyboardOffset}
        onSubmit={handleAddTask}
      />
      <AddButton onPress={() => setOpen(!open)} keyboardOffset={keyboardOffset} />
    </View>
  );
}