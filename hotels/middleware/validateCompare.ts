interface ValidateResponse {
  valid: boolean;
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path !== "/compare") return;
  const ids = to.query.ids;

  if (!ids || typeof ids !== "string") {
    return navigateTo("/hotels");
  }

  const idArray = ids.split(",").map((id) => Number(id));
  if (idArray.some((id) => isNaN(id) || id <= 0)) {
    return navigateTo("/hotels");
  }

  try {
    const response = await $fetch<ValidateResponse>("/api/hotels/validate", {
      method: "POST",
      body: { ids: idArray },
    });

    if (!response.valid) {
      return navigateTo("/hotels");
    }
  } catch (error) {
    console.error("Erro ao validar os IDs:", error);
    return navigateTo("/hotels");
  }
});
