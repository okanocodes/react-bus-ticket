import SearchForm from "../components/SearchForm";
import ScheduleList from "../components/ScheduleList";
import { useMemo, useState } from "react";
import { useSchedules } from "../hooks/useSchedules";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SearchPage() {
  const [formInputs, setFormInputs] = useState<{
    from: string;
    to: string;
    date: string;
  } | null>(null);

  const { data: schedules = [], isLoading } = useSchedules(
    formInputs?.from || null,
    formInputs?.to || null,
    formInputs?.date || null
  );

  // Add sorting state
  const [sortBy, setSortBy] = useState<"departure" | "price" | null>(null);

  // Sort schedules based on sortBy state
  const sortedSchedules = useMemo(() => {
    if (!sortBy || !schedules.length) return schedules;

    return [...schedules].sort((a, b) => {
      if (sortBy === "departure") {
        return (
          new Date(a.departure).getTime() - new Date(b.departure).getTime()
        );
      }
      if (sortBy === "price") {
        return a.price - b.price;
      }
      return 0;
    });
  }, [schedules, sortBy]);

  const handleSortByDeparture = () => {
    setSortBy("departure");
  };

  const handleSortByPrice = () => {
    setSortBy("price");
  };

  const { t } = useTranslation();

  return (
    <>
      <div>{t("searchScehedule")}</div>
      <SearchForm onSearch={setFormInputs} />
      {isLoading && <Typography mt={2}>{t("loading")}</Typography>}
      {!isLoading && formInputs && (
        <ScheduleList
          list={sortedSchedules}
          onSortByDeparture={handleSortByDeparture}
          onSortByPrice={handleSortByPrice}
          scheduleDate={formInputs.date}
        />
      )}
    </>
  );
}
