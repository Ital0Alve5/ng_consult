<template>
  <Card class="w-full max-w-[600px] bg-brand-card border-brand-border">
    <CardHeader>
      <CardTitle class="text-center text-white font-medium">Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form>
        <div class="mb-4">
          <Email v-model="form.email.value" :error="form.email.error" />
        </div>

        <div class="mb-4">
          <Password
            v-model="form.password.value"
            :error="form.password.error"
          />
        </div>
      </form>
    </CardContent>
    <CardFooter>
      <Button
        class="bg-brand-green hover:bg-brand-green-hover text-black py-2 px-4 rounded w-full transition"
        @click="handleForm"
      >
        Entrar
      </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify";

import Email from "@ng_consult/core/components/form/Email.vue";
import Password from "@ng_consult/core/components/form/Password.vue";
import { useValidation } from "@ng_consult/core/composables/useValidation";
import { useForm } from "@ng_consult/core/composables/useForm";
import { useAuthStore } from "../store/useAuth";


definePageMeta({
  layout: "login",
});

const authStore = useAuthStore();
const loginError = ref<string | undefined>("");

const { requiredRule, emailRule, minLengthRule } = useValidation();

const { form, validateForm } = useForm([
  {
    name: "email",
    initialValue: "",
    rules: [requiredRule, emailRule],
  },
  {
    name: "password",
    initialValue: "",
    rules: [
      requiredRule,
      minLengthRule(6, "A senha deve ter pelo menos 6 caracteres."),
    ],
  },
]);

const handleForm = async () => {
  if (!validateForm()) return;

  const result = await authStore.login(form.email.value, form.password.value);

  if (!result.success) {
    toast.error(result.message);
  } else {
    loginError.value = "";
    navigateTo("/hotels");
  }
};
</script>
