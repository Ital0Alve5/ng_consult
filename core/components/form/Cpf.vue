<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps({
  error: {
    type: String,
    default: "",
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();
</script>

<template>
  <div>
    <Label class="text-white">CPF</Label>
    <Input
      v-mask="'###.###.###-##'"
      type="text"
      placeholder="Digite seu CPF"
      :class="error ? 'border-feedback-negative-border' : 'border-gray-300'"
      @update:model-value="(value) => emits('update:modelValue', value)"
    />

    <p v-if="error" class="text-feedback-negative-text text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
