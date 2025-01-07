import validateCpf from "../utils/validations/validateCpf";
import validatePhone from "../utils/validations/validatePhone";
import validateCreditCard from "../utils/validations/validateCreditCard";
import validateExpiryDate from "../utils/validations/validateExpiryDate";

export function useValidation() {
  const requiredRule = (value: string) =>
    !value ? "Este campo é obrigatório." : "";

  const emailRule = (value: string) =>
    typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ""
      : "E-mail inválido.";

  const minLengthRule = (min: number, message: string) => (value: string) =>
    value && value.length >= min ? "" : message;

  const cpfRule = (value: string) =>
    typeof value === "string" && validateCpf(value) ? "" : "CPF inválido.";

  const phoneRule = (value: string) =>
    typeof value === "string" && validatePhone(value)
      ? ""
      : "Telefone inválido.";

  const creditCardRule = (value: string) =>
    typeof value === "string" && validateCreditCard(value)
      ? ""
      : "Número do cartão inválido.";

  const expiryDateRule = (value: string) =>
    typeof value === "string" && validateExpiryDate(value)
      ? ""
      : "Data de validade inválida.";

  const cvcRule = (value: string) =>
    typeof value === "string" && value.length === 3 ? "" : "CVC inválido.";

  return {
    requiredRule,
    emailRule,
    minLengthRule,
    cpfRule,
    phoneRule,
    creditCardRule,
    expiryDateRule,
    cvcRule,
  };
}
