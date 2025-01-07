<script setup lang="ts">
const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();
</script>

<template>
  <Select
    @update:model-value="(value: string) => emits('update:modelValue', value)"
  >
    <SelectTrigger>
      <SelectValue placeholder="Ordenação" />
    </SelectTrigger>
    <LazySelectContent>
      <LazySelectGroup>
        <LazySelectLabel>Ordenar por</LazySelectLabel>
        <LazySelectItem value="suggestion"> Sugestões </LazySelectItem>
        <LazySelectItem value="highestPrice"> Maior preço </LazySelectItem>
        <LazySelectItem value="lowestPrice"> Menor preço </LazySelectItem>
        <LazySelectItem value="highestRating">
          Maiores avaliações
        </LazySelectItem>
        <LazySelectItem value="lowestRating">
          Menores avaliações
        </LazySelectItem>
      </LazySelectGroup>
    </LazySelectContent>
  </Select>
</template>
