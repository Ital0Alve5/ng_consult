<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
defineProps({
  error: {
    type: String,
    default: "",
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();
</script>

<template>
  <div>
    <Label class="text-white">E-mail</Label>
    <Input
      type="text"
      placeholder="Digite seu E-mail"
      :class="error ? 'border-feedback-negative-border' : ''"
      @update:model-value="(value) => emits('update:modelValue', value as string)"
    />

    <p v-if="error" class="text-feedback-negative-text text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>
