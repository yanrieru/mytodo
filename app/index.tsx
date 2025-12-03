import { useEffect, useRef, useState } from "react";
import { Animated, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";

import CalendarStrip from "./components/CalendarStrip";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TaskItem from "./components/TaskItem";

import AddButton from "./components/AddButton";
import AddForm from "./components/AddForm";

export default function Home() {
  const [open, setOpen] = useState(false);

  // Animated value untuk naik-turun mengikuti keyboard
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // Deteksi Keyboard
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

  const tasks = [
    { id: 1, time: "08:00 AM", title: "Breakfast with Tim" },
    { id: 2, time: "11:30 AM", title: "Interview at NBC" },
    { id: 3, time: "14:00 PM", title: "Team meeting" },
    { id: 4, time: "15:20 PM", title: "UI design challenge" },
    { id: 5, time: "19:00 PM", title: "Family Lunch" },
    { id: 6, time: "15:20 PM", title: "UI design challenge" },
    { id: 7, time: "19:00 PM", title: "Family Lunch" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#54504F" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Header />
          <CalendarStrip />
          <SearchBar />
        </View>
      </TouchableWithoutFeedback>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 0, paddingHorizontal: 20 }}>
          {tasks.map((task) => (
            <TaskItem key={task.id} time={task.time} title={task.title} />
          ))}
        </View>
      </ScrollView>

      <AddForm open={open} keyboardOffset={keyboardOffset} />
      <AddButton onPress={() => setOpen(!open)} keyboardOffset={keyboardOffset} />
    </View>
  );
}
