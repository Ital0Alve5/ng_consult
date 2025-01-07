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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
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
    </div>
  </div>
</template>
<script setup lang="ts">
import type { DateRange } from "radix-vue";
import formatCurrency from "@ng_consult/core/utils/format/formatCurrency";
import ButtonLink from "@ng_consult/app/components/ui/button/ButtonLink.vue";

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
  bookings: Booking[];
  amenities: string[];
}

const comparedHotels = ref<number[]>([]);
const toggleComparing = () => {
  isComparing.value = !isComparing.value;

  comparedHotels.value = [];
};

const goToComparison = () => {
  const queryString = comparedHotels.value.join(",");
  return `/compare?ids=${queryString}`;
};

const handleCompareHotel = ($event: boolean, hotelId: number) => {
  if ($event) {
    comparedHotels.value.push(hotelId);
    return;
  }

  comparedHotels.value = comparedHotels.value.filter((id) => id !== hotelId);
};

const hotels = ref<Hotel[]>([]);
const isComparing = ref(false);

const filters = ref({
  name: "",
  checkIn: "",
  checkOut: "",
  rooms: 1,
  guests: 1,
});

const sortCriteria = ref("suggestion");

const filteredHotels = computed(() => {
  return hotels.value.filter((hotel: Hotel) => {
    if (
      filters.value.name.trim() &&
      !hotel.name
        .toLowerCase()
        .trim()
        .includes(filters.value.name.toLowerCase().trim())
    ) {
      return false;
    }

    if (filters.value.guests > hotel.capacity) {
      return false;
    }

    if (filters.value.rooms > hotel.rooms) {
      return false;
    }

    if (filters.value.checkIn && filters.value.checkOut) {
      const checkInDate = new Date(filters.value.checkIn);
      const checkOutDate = new Date(filters.value.checkOut);

      const isAvailable = hotel.bookings.every((booking) => {
        const bookingCheckIn = new Date(booking.checkIn);
        const bookingCheckOut = new Date(booking.checkOut);

        return checkOutDate <= bookingCheckIn || checkInDate >= bookingCheckOut;
      });

      if (!isAvailable) {
        return false;
      }
    }

    return true;
  });
});

const sortedHotels = computed(() => {
  const hotelsToSort = [...filteredHotels.value];
  if (sortCriteria.value === "lowestPrice") {
    return hotelsToSort.sort((a, b) => a.price - b.price);
  }
  if (sortCriteria.value === "highestPrice") {
    return hotelsToSort.sort((a, b) => b.price - a.price);
  }
  if (sortCriteria.value === "lowestRating") {
    return hotelsToSort.sort((a, b) => a.rating - b.rating);
  }
  if (sortCriteria.value === "highestRating") {
    return hotelsToSort.sort((a, b) => b.rating - a.rating);
  }
  return hotelsToSort;
});

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
