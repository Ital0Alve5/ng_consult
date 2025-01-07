export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.name || !body.cpf || !body.email || !body.phone) {
    throw createError({
      statusCode: 400,
      message: "Preencha todos os campos obrigatórios",
    });
  }

  return { success: true, message: "Reserva realizada com sucesso!" };
});
