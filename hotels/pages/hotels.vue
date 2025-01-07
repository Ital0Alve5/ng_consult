<template>
  <div class="w-full md:w-fit">
    <div class="flex flex-col md:flex-row items-end justify-center gap-3">
      <SearchHotelName v-model="filters.name" />
      <DateRange @update:model-value="setDates" />
      <div class="flex w-full md:w-fit gap-3">
        <RoomsQuantity v-model="filters.rooms" />
        <GuestsQuantity v-model="filters.guests" />
      </div>
    </div>
    <div class="mt-8 flex items-start w-full">
      <div class="flex flex-col md:flex-row gap-2 w-full">
        <div class="w-full md:w-fit"><SortBy v-model="sortCriteria" /></div>

        <div class="flex items-start">
          <div class="flex items-center text-sm gap-2 py-1 px-2.5 text-white">
            Comparação:
            <Switch
              class="data-[state=checked]:bg-brand-green data-[state=unchecked]:bg-brand-border"
              :checked="isComparing"
              @update:checked="toggleComparing"
            />
          </div>

          <ButtonLink
            v-if="isComparing && comparedHotels.length > 1"
            :href="goToComparison()"
          >
            Iniciar comparação
          </ButtonLink>
        </div>
      </div>
    </div>

    <NuxtImg
      v-if="isLoading"
      src="/loader.svg"
      class="mx-auto mt-20"
      width="80"
      height="80"
    />

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 min-h-[651px]"
    >
      <HotelCard
        v-for="hotel in sortedHotels"
        :id="hotel.id"
        :key="hotel.id"
        class="justify-self-center"
        :is-comparing="isComparing"
        :photo="hotel.photo"
        :name="hotel.name"
        :location="hotel.location"
        :rating="hotel.rating"
        :guests="hotel.capacity"
        :rooms="hotel.rooms"
        :amenities="hotel.amenities"
        :price="formatCurrency(hotel.price)"
        @update:compared-hotels="
          handleCompareHotel($event as boolean, hotel.id)
        "
      />
      <p v-if="sortedHotels.length === 0 && !isLoading" class="text-white">
        Nenhum hotel encontrado!
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import formatCurrency from "@ng_consult/core/utils/format/formatCurrency";
import ButtonLink from "@ng_consult/app/components/ui/button/ButtonLink.vue";

const hotels = ref<Hotel[]>([]);

const { filters, sortCriteria, sortedHotels } = useHotelFilters(hotels);
const {
  comparedHotels,
  isComparing,
  toggleComparing,
  handleCompareHotel,
  goToComparison,
} = useHotelComparison();
const { isLoading } = useLoading();

onMounted(async () => {
  const response = await $fetch<{ hotels: Hotel[] }>("/api/hotels", {
    method: "GET",
  });

  hotels.value = response.hotels;
});

const setDates = (dates: Ref<DateRange>) => {
  const startDate = dates.value.start;
  const endDate = dates.value.end;
  filters.value.checkIn = `${startDate?.year}-${startDate?.month}-${startDate?.day}`;
  filters.value.checkOut = `${endDate?.year}-${endDate?.month}-${endDate?.day}`;
};
</script>
