interface ValidateResponse {
  valid: boolean;
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/reserve")) return;
  const id = Number(to.params.id);

  if (isNaN(id) || id <= 0) {
    return navigateTo("/hotels");
  }

  try {
    const response = await $fetch<ValidateResponse>(`/api/hotels/${id}/validate`);
    if (!response.valid) {
      return navigateTo("/hotels");
    }
  } catch (error) {
    console.error("Erro ao validar o ID:", error);
    return navigateTo("/hotels");
  }
});
