import { mockHotels } from "../mock/mockHotels";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.ids || !Array.isArray(body.ids)) {
    throw createError({
      statusCode: 400,
      message: "IDs inválidos ou não enviados.",
    });
  }

  const validIds = mockHotels.map((hotel) => hotel.id);
  const isValid = body.ids.every((id: string) => validIds.includes(Number(id)));

  return { valid: isValid };
});
