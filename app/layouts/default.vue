<template>
  <div>
    <Header />
    <div
      class="w-full pt-20 min-h-screen flex items-center justify-center px-5"
    >
      <slot />
    </div>
  </div>
</template>
<script setup land="ts">
import Header from "@/components/Header/index";
</script>
