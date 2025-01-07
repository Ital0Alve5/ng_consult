export function useResponsive(breakpoint = 1500) {
  const isMobile = ref(false);

  function checkMobileView() {
    isMobile.value = window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  }

  onMounted(() => {
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkMobileView);
  });

  return { isMobile };
}
