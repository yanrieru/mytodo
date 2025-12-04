import { useEffect, useRef, useState } from "react";
import { Animated, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CalendarModal from "./components/CalendarModal";
import CalendarStrip from "./components/CalendarStrip";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/SideBar";
import TaskItem from "./components/TaskItem";

import AddButton from "./components/AddButton";
import AddForm from "./components/AddForm";
import EditModal from "./components/EditModal";

// format jam otomatis
function getCurrentTime() {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes().toString().padStart(2, "0");

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour}:${minute} ${ampm}`;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  // daftar task
  const [tasks, setTasks] = useState<{ id: string; title: string; time: string; completed: boolean }[]>([]);

  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // load app saat app start
  useEffect(() => {
    async function loadTasks() {
      const saved = await AsyncStorage.getItem("TASKS");

      if (saved) {
        setTasks(JSON.parse(saved));
      }
    }

    loadTasks();
  }, []);

  // save tasks setiap ada perubahan
  useEffect(() => {
    AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  // animasi form saat keyboard muncul
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

  // add menambah task
  const handleAddTask = (text: string) => {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: text,
      time: getCurrentTime(),
      completed: false, // ⬅ jam otomatis
    };

    setTasks((prev) => [newTask, ...prev]);
    setOpen(false); // tutup form
    Keyboard.dismiss();
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  // delete task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditVisible(true);
  };

  const closeEditModal = () => {
    setEditVisible(false);
    setSelectedTask(null);
  };

  // update title
  const handleSaveEdit = (id: string, newTitle: string) => {
    editTask(id, newTitle);
    closeEditModal();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#54504F" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Header onMenuPress={() => setSidebarOpen(true)} onCalendarPress={() => setCalendarVisible(true)} />

          <CalendarModal visible={calendarVisible} onClose={() => setCalendarVisible(false)} />

          <CalendarStrip />
          <SearchBar />
        </View>
      </TouchableWithoutFeedback>

      {/* TASK LIST */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 0, paddingHorizontal: 20 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              time={task.time}
              title={task.title}
              completed={task.completed}
              onEdit={(id) => {
                const found = tasks.find((t) => t.id === id);
                if (found) openEditModal(found);
              }}
              onToggleCompleted={() => toggleComplete(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </View>
      </ScrollView>

      {selectedTask && <EditModal visible={editVisible} onClose={closeEditModal} initialTitle={selectedTask.title} onSave={(newTitle) => handleSaveEdit(selectedTask.id, newTitle)} />}

      {/* SIDEBAR */}
      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* FORM INPUT */}
      <AddForm
        open={open}
        keyboardOffset={keyboardOffset}
        onSubmit={handleAddTask} // ⬅ fungsi submit
      />

      {/* TOMBOL + */}
      <AddButton onPress={() => setOpen(!open)} keyboardOffset={keyboardOffset} />
    </View>
  );
}
