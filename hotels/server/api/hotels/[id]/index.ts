import { mockHotels } from "../../mock/mockHotels";

export default defineEventHandler(async (event) => {
  if (!event.context.params || !event.context.params.id) {
    throw createError({
      statusCode: 400,
      message: "Parâmetro ID não encontrado na rota",
    });
  }

  const params = event.context.params as { id: string };
  const id = parseInt(params.id, 10);

  const hotel = mockHotels.find((h) => h.id === id);

  if (!hotel) {
    throw createError({ statusCode: 404, message: "Hotel não encontrado" });
  }

  return hotel;
});
