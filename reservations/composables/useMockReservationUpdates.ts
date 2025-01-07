import { useNotificationStore } from "@/store/useNotificationStore";
import { useReservationStore } from "../store/useReservationStore";

export function useMockReservationUpdates() {
  const notificationStore = useNotificationStore();
  const reservationStore = useReservationStore();

  const startMockUpdates = (reservationId: string, roomName: string) => {
    const updates = [
      "Reserva confirmada",
      "Preparando o quarto",
      "Quarto disponível para check-in",
    ];

    updates.forEach((message, index) => {
      setTimeout(() => {
        reservationStore.updateReservationStatus(reservationId, message);
        notificationStore.addNotification(message, roomName);
      }, (index + 1) * 8000);
    });
  };

  return { startMockUpdates };
}
