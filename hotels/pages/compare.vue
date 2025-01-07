<template>
  <div class="flex flex-col items-center px-4 md:px-8 lg:px-16">
    <NuxtLink to="/hotels" class="mr-auto">
      <CircleChevronLeft :size="40" fill="#24da8d" />
    </NuxtLink>

    <div
      class="listing grid gap-6 my-8 w-full max-w-[1900px]"
      :class="{
        'grid-cols-1': comparedHotels.length === 1,
        'grid-cols-2': comparedHotels.length === 2 && !isMobile,
        'grid-cols-3': comparedHotels.length === 3 && !isMobile,
      }"
      :style="{ justifyContent: justifyStyle }"
    >
      <ComparationCard
        v-for="hotel in comparedHotels"
        :id="hotel.id"
        :key="hotel.id"
        class="justify-self-center"
        :name="hotel.name"
        :description="hotel.description"
        :photo="hotel.photo"
        :location="hotel.location"
        :rating="hotel.rating"
        :guests="hotel.capacity"
        :rooms="hotel.rooms"
        :suite="hotel.suite"
        :bathrooms="hotel.bathrooms"
        :area="hotel.area"
        :amenities="hotel.amenities"
        :price="formatCurrency(hotel.price)"
      />
    </div>
    <div v-if="!comparedHotels.length" class="text-center mt-10">
      <p class="text-white">Nenhum hotel selecionado para comparação.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleChevronLeft } from "lucide-vue-next";
import formatCurrency from "@ng_consult/core/utils/format/formatCurrency";

interface Booking {
  checkIn: string;
  checkOut: string;
}

interface Hotel {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  photo: string;
  location: string;
  capacity: number;
  rooms: number;
  bathrooms: number;
  suite: number;
  area: number;
  bookings: Booking[];
  amenities: string[];
}

const comparedHotels = ref<Hotel[]>([]);
const isMobile = ref(false);
const route = useRoute();
const hotelIds = route.query.ids
  ? (route.query.ids as string).split(",").map(Number)
  : [];

const justifyStyle = computed(() => {
  const count = comparedHotels.value.length;
  return count < 4 ? "center" : "start";
});

function checkMobileView() {
  isMobile.value = window.matchMedia("(max-width: 1500px)").matches;
}

onMounted(async () => {
  checkMobileView();
  window.addEventListener("resize", checkMobileView);

  if (hotelIds.length > 0) {
    try {
      const response = await $fetch<{ hotels: Hotel[] }>(
        `/api/hotels/compare?ids=${hotelIds.join(",")}`
      );
      comparedHotels.value = response.hotels;
    } catch (error) {
      console.error("Erro ao buscar os hotéis para comparação:", error);
      comparedHotels.value = [];
    }
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobileView);
});
</script>
