<template>
  <header
    class="p-4 md:px-20 flex items-center justify-end gap-5 w-full fixed bg-[#031025] z-10"
  >
    <p class="text-lg text-[#18db88]">
      Olá, <strong>{{ user?.name || "Usuário" }}</strong>
    </p>
    <Notification />
    <LogOut @click="logout" color="white" class="cursor-pointer" />
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from "@ng_consult/auth/store/useAuth";
import { LogOut } from "lucide-vue-next";
import Notification from "./Notification.vue";

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const logout = () => {
  authStore.logout();
  navigateTo("/login");
};
</script>

<style scoped>
header {
  box-shadow: 0 0px 1px #18db88;
}
</style>
