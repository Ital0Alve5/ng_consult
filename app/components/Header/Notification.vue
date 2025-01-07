<template>
  <Popover>
    <PopoverTrigger as-child>
      <div>
        <BellDot
          v-if="hasNotifications"
          :size="24"
          class="cursor-pointer"
          fill="#fff"
          color="white"
        />
        <Bell v-else :size="24" class="cursor-pointer" color="white" />
      </div>
    </PopoverTrigger>
    <PopoverContent class="w-80 py-0">
      <ul v-if="hasNotifications" class="flex flex-col">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          @click="markNotificationAsRead(notification.id)"
          class="border-b py-3 flex flex-col gap-1 cursor-pointer"
        >
          <div class="flex justify-between items-center">
            <span class="font-semibold">{{ notification.roomName }} </span>
          </div>
          <div class="text-sm text-gray-500">
            <p>{{ notification.message }}</p>
            <p class="text-xs text-end mt-2">{{ notification.date }}</p>
          </div>
        </li>
      </ul>
      <p v-else class="border-b py-5 text-center">Não há notificações.</p>
    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts">
import { useNotificationStore } from "@/store/useNotificationStore";
import { Bell, BellDot } from "lucide-vue-next";

const notificationStore = useNotificationStore();

const notifications = computed(() => notificationStore.notifications);
const hasNotifications = computed(() => notifications.value.length > 0);

const markNotificationAsRead = (id: number) => {
  notificationStore.removeNotification(id);
};
</script>
