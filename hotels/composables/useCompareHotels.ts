import { ref } from "vue";

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
  amenities: string[];
}

export function useCompareHotels() {
  const comparedHotels = ref<Hotel[]>([]);

  async function fetchComparedHotels(hotelIds: number[]) {
    if (hotelIds.length === 0) {
      comparedHotels.value = [];
      return;
    }

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

  return { comparedHotels, fetchComparedHotels };
}
