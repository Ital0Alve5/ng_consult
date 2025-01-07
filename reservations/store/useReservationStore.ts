import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservations: [] as Array<{
      id: string;
      hotelName: string;
      date: string;
      status: string;
    }>,
  }),
  actions: {
    addReservation(reservation: { id: string; hotelName: string; date: string; status: string }) {
      this.reservations.push(reservation);
    },
    updateReservationStatus(id: string, status: string) {
      const reservation = this.reservations.find((r) => r.id === id);
      if (reservation) {
        reservation.status = status;
      }
    },
  },
});
