import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/apiClient";
import type { SeatSchema } from "../types/seats";
import { useTripStore } from "../store/useTripStore";
import dayjs from "dayjs";

export function useSeatSchema(tripId: string) {
  const trip = useTripStore((s) => s.selectedTrip);

  const date = trip ? dayjs(trip.departure).format("YYYY-MM-DD") : null;

  return useQuery<SeatSchema>({
    queryKey: ["seatSchema", tripId, date],
    queryFn: () => apiClient.get(`/api/seatSchemas/${tripId}?date=${date}`),
    enabled: Boolean(tripId && date),
  });
}
