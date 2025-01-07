<template>
  <NuxtLink
    class="w-full bg-brand-green hover:bg-brand-green-hover px-4 py-2 text-center rounded-md text-sm font-medium"
    :to="props.href"
    prefetch
  >
    <slot
  /></NuxtLink>
</template>
<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
