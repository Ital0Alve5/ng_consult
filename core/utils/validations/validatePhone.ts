export default function validatePhone(phone: string): boolean {
  const sanitized = phone.replace(/[^\d]+/g, "");
  return /^\d{10,11}$/.test(sanitized);
}
