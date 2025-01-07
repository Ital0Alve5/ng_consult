<script setup lang="ts">
import { Search } from "lucide-vue-next";

const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();
</script>

<template>
  <div class="relative w-full items-center">
    <Input
      type="text"
      placeholder="Procure pelo nome do hotel"
      class="pl-10"
      @update:model-value="(value: string | number) => emits('update:modelValue', String(value))"
    />
    <span
      class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
    >
      <Search class="size-5 text-muted-foreground" />
    </span>
  </div>
</template>
