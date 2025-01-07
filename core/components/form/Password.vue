<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";

defineProps({
  error: {
    type: String,
    default: "",
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
  <div>
    <Label class="text-white">Senha</Label>
    <div class="relative">
      <Input
        :type="isPasswordVisible ? 'text' : 'password'"
        placeholder="Digite sua Senha"
        :class="error ? 'border-feedback-negative-border' : 'border-gray-300'"
        class="pr-10"
        @update:model-value="(value) => emits('update:modelValue', value)"
      />
      <button
        type="button"
        class="absolute right-2.5 top-2.5 text-gray-500"
        @click="togglePasswordVisibility"
      >
        <Eye v-if="!isPasswordVisible" :size="20" />
        <EyeOff v-else :size="20" />
      </button>
    </div>

    <p v-if="error" class="text-feedback-negative-text text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
