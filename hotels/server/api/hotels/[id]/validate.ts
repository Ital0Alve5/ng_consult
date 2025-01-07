import { mockHotels } from "../../mock/mockHotels";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (isNaN(id) || id <= 0) {
    throw createError({
      statusCode: 400,
      message: "ID inválido.",
    });
  }

  const isValid = mockHotels.some((hotel) => hotel.id === id);

  return { valid: isValid };
});
