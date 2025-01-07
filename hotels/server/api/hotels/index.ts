import { mockHotels } from "../mock/mockHotels";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const filteredHotels = mockHotels.filter((hotel) => {
    if (
      query.destination &&
      !hotel.location
        .toLowerCase()
        .includes((query.destination as string).toLowerCase())
    ) {
      return false;
    }

    if (query.guests && Number(query.guests) > hotel.capacity) {
      return false;
    }

    if (query.rooms && Number(query.rooms) > hotel.rooms) {
      return false;
    }

    if (query.checkIn && query.checkOut) {
      const checkInDate = new Date(query.checkIn as string);
      const checkOutDate = new Date(query.checkOut as string);

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

  return { hotels: filteredHotels };
});
