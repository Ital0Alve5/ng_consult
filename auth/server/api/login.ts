export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const mockUser = {
    email: "italo@gmail.com",
    password: "1234567",
    name: "Ítalo Alves",
  };

  if (email === mockUser.email && password === mockUser.password) {
    return {
      success: true,
      user: { email: mockUser.email, name: mockUser.name },
    };
  } else {
    return {
      success: false,
      user: null,
      message: "Credenciais inválidas.",
    };
  }
});
