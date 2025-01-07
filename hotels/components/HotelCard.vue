<script setup lang="ts">
import { Star } from "lucide-vue-next";
import ButtonLink from "@ng_consult/app/components/ui/button/ButtonLink.vue";

const props = defineProps({
  isComparing: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  amenities: {
    type: Array as () => string[],
    required: true,
  },
});

const emits = defineEmits<{
  (e: "update:comparedHotels", payload: boolean): void;
}>();
</script>

<template>
  <Card class="w-[350px] bg-brand-card border-brand-border">
    <CardHeader>
      <Checkbox
        v-if="isComparing"
        class="bg-white"
        @update:checked="(value: boolean) => emits('update:comparedHotels', value)"
      />
      <NuxtImg
        src="https://via.placeholder.com/300x200"
        class="w-full h-40 object-cover rounded"
      />
      <div class="flex justify-between items-start">
        <div>
          <CardTitle class="text-lg text-white">{{ name }}</CardTitle>
          <CardDescription class="text-md text-white">
            {{ location }}
          </CardDescription>
          <CardDescription class="text-white">
            {{ rooms }} quartos &bull; {{ guests }} hóspedes
          </CardDescription>
        </div>
        <div class="flex items-center gap-1 text-brand-green">
          {{ rating }}<Star fill="#24da8d" color="#24da8d" :size="20" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <ul class="grid grid-cols-2 gap-4 mb-5">
        <li
          v-for="amenitie in amenities"
          :key="amenitie"
          class="text-sm text-white text-neutral-500 dark:text-neutral-400"
        >
          {{ amenitie }}
        </li>
      </ul>
      <strong class="text-mg justify-self-start text-white"
        >{{ price }}/noite</strong
      >
    </CardContent>
    <CardFooter class="flex flex-col">
      <ButtonLink :href="`/reserve/${props.id}`"> Reservar </ButtonLink>
    </CardFooter>
  </Card>
</template>
