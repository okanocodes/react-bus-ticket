import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/apiClient";
import type { ScheduleItem } from "../types/schedules";

export function useSchedules(
  from: string | null,
  to: string | null,
  date: string | null
) {
  return useQuery<ScheduleItem[]>({
    queryKey: ["schedules", from, to, date],
    queryFn: () =>
      apiClient.get(`/api/schedules?from=${from}&to=${to}&date=${date}`),
    enabled: Boolean(from && to && date),
  });
}
