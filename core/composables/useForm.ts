import { reactive } from "vue";

interface Field {
  name: string;
  initialValue?: string;
  rules?: ((value: string) => string)[];
}

interface FormField {
  value: string;
  error: string;
}

export function useForm(fields: Field[]) {
  const form = reactive<Record<string, FormField>>(
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        { value: field.initialValue || "", error: "" },
      ])
    )
  );

  const validateField = (fieldName: string) => {
    const field = fields.find((f) => f.name === fieldName);
    if (field?.rules) {
      for (const rule of field.rules) {
        const error = rule(form[fieldName].value);
        if (error) {
          form[fieldName].error = error;
          return;
        }
      }
    }
    form[fieldName].error = "";
  };

  const validateForm = () => {
    let isValid = true;
    for (const fieldName of Object.keys(form)) {
      validateField(fieldName);
      if (form[fieldName].error) isValid = false;
    }
    return isValid;
  };

  return {
    form,
    validateField,
    validateForm,
  };
}
