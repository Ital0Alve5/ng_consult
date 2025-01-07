<script setup lang="ts">
const emits = defineEmits<{
  (e: "update:modelValue", payload: number): void;
}>();
</script>

<template>
  <NumberField
    class="w-full md:w-fit"
    :default-value="1"
    :min="0"
    @update:model-value="(value: number) => emits('update:modelValue', value)"
  >
    <Label class="text-white">Hóspedes</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
