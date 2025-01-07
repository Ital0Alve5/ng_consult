import { defineStore } from "pinia";

interface Notification {
  id: number;
  message: string;
  read: boolean;
  date: string;  
  roomName: string;
}

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [] as Notification[],
    lastId: 0,
  }),
  getters: {
    unreadCount: (state) =>
      state.notifications.filter((notification) => !notification.read).length,
    allNotifications: (state) => state.notifications,
  },
  actions: {
    addNotification(message: string, roomName: string) {
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, "0")}/${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${now.getFullYear()} ${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      this.notifications.push({
        id: ++this.lastId,
        message,
        read: false,
        date: formattedDate,
        roomName, 
      });
    },
    markAsRead(id: number) {
      const notification = this.notifications.find((n) => n.id === id);
      if (notification) notification.read = true;
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter((n) => n.id !== id);
    },
  },
});
