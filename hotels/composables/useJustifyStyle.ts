
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

export function useJustifyStyle(comparedHotels: Ref<Hotel[]>) {
  const justifyStyle = computed(() => {
    const count = comparedHotels.value.length;
    return count < 4 ? "center" : "start";
  });

  return { justifyStyle };
}
