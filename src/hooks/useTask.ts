import { useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/task";

export function useTask() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, time: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      time,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updated: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updated } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
