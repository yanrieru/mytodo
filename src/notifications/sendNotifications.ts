import * as Notifications from "expo-notifications";

export async function sendNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: "default",
    },
    trigger: null,
  });
}
