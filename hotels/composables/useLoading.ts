import { ref } from "vue";
import { useNuxtApp } from "#app";

export function useLoading() {
  const isLoading = ref(true);

  const nuxtApp = useNuxtApp();
  nuxtApp.hook("page:finish", () => {
    isLoading.value = false;
  });

  return { isLoading };
}
