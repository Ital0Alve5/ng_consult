export default function validateCreditCard(cardNumber: string): boolean {
  cardNumber = cardNumber.replace(/\s+/g, "");

  if (!/^\d{16}$/.test(cardNumber)) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
