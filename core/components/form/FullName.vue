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
    <Label class="text-white">Nome completo</Label>
    <Input
      type="text"
      placeholder="Digite seu nome completo"
      :class="error ? 'border-feedback-negative-border' : ''"
      @update:model-value="(value) => emits('update:modelValue', value)"
    />

    <p v-if="error" class="text-feedback-negative-text text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
