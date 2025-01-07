export default function calculateInstallmentValue(
  amount: number,
  rate: number,
  installments: number
): number {
  if (rate === 0) {
    return amount / installments;
  }

  const monthlyRate = rate / 100;
  const factor = Math.pow(1 + monthlyRate, installments);

  const installmentValue = (amount * monthlyRate * factor) / (factor - 1);

  return installmentValue;
}
