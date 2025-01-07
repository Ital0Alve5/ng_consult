interface Field {
  name: string;
  initialValue?: string | number;
  validate?: (value: string | number) => string;
}

interface FormField {
  value: string | number;
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

  const validators = Object.fromEntries(
    fields.map((field) => [field.name, field.validate || (() => "")])
  );

  const validateField = (fieldName: string) => {
    if (validators[fieldName]) {
      form[fieldName].error = validators[fieldName](form[fieldName].value);
    }
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
