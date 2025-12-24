import * as Notifications from "expo-notifications";

export async function scheduleTaskReminder(taskTitle: string, date: Date) {
  if (isNaN(date.getTime()) || date.getTime() < Date.now()) {
    throw new Error("Tanggal reminder tidak valid atau sudah lewat.");
  }

  // Debug log
  console.log("Trigger yg dikirim:", {
    type: "date",
    date: date.getTime(),
    readable: new Date(date.getTime()).toString()
  });

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: "Dont Forget your Task !",
      sound: true,
    },
    trigger: {
      type: "date",
      date: date.getTime(),
    },
  });

  return id;
}
