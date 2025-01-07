import { ref } from "vue";

export function useHotelComparison() {
  const comparedHotels = ref<number[]>([]);
  const isComparing = ref(false);

  const toggleComparing = () => {
    isComparing.value = !isComparing.value;
    comparedHotels.value = [];
  };

  const handleCompareHotel = (add: boolean, hotelId: number) => {
    if (add) {
      comparedHotels.value.push(hotelId);
    } else {
      comparedHotels.value = comparedHotels.value.filter((id) => id !== hotelId);
    }
  };

  const goToComparison = () => {
    const queryString = comparedHotels.value.join(",");
    return `/compare?ids=${queryString}`;
  };

  return { comparedHotels, isComparing, toggleComparing, handleCompareHotel, goToComparison };
}
