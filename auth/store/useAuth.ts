/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
  email: string;
  name: string;
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<User | null>(null);

    const login = async (email: string, password: string) => {
      try {
        const response = await $fetch<{
          success: boolean;
          user: User;
          message?: string;
        }>("/api/login", {
          method: "POST",
          body: { email, password },
        });

        if (response.success) {
          user.value = response.user;
          return { success: true };
        } else {
          return { success: false, message: response.message };
        }
      } catch (error) {
        return { success: false, message: "Erro ao conectar ao servidor." };
      }
    };

    const logout = () => {
      user.value = null;
    };

    const loadUserFromLocalStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        user.value = JSON.parse(storedUser);
      }
    };

    return { user, login, logout, loadUserFromLocalStorage };
  },
  {
    persist: true,
  }
);
