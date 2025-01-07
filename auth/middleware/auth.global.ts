import { useAuthStore } from "@ng_consult/auth/store/useAuth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  const publicRoutes = ["/", "/login"];

  if (publicRoutes.includes(to.path)) {
    return;
  }
  
  if (!authStore.user) {
    return navigateTo("/login");
  }
});
