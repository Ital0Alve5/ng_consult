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

export function useHotelFilters(hotels: Ref<Hotel[]>) {
  const filters = ref({
    name: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    guests: 1,
  });

  const sortCriteria = ref("suggestion");

  const filteredHotels = computed(() => {
    return hotels.value.filter((hotel) => {
      if (
        filters.value.name.trim() &&
        !hotel.name
          .toLowerCase()
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

          return (
            checkOutDate <= bookingCheckIn || checkInDate >= bookingCheckOut
          );
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

  return { filters, sortCriteria, filteredHotels, sortedHotels };
}
