import { mockHotels } from "../mock/mockHotels";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const hotelIds = (query.ids as string)?.split(",").map(Number) || [];

  const comparedHotels = mockHotels.filter((hotel) =>
    hotelIds.includes(hotel.id)
  );

  return { hotels: comparedHotels };
});
