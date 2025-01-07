import Toast, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  const options: ToastContainerOptions = {
    position: "top-right",
    autoClose: 5000, 
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored", 
  };

  nuxtApp.vueApp.use(Toast, options);
});
