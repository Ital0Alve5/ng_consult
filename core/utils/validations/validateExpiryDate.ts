export default function validateExpiryDate(expiryDate: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return false;
  }

  const [month, year] = expiryDate.split("/").map(Number);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;

  if (month < 1 || month > 12) return false;
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
}
