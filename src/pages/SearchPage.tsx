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

  // NEW — selected company
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // Get unique companies from schedule list
  const companies = useMemo(() => {
    if (!schedules.length) return [];
    return [...new Set(schedules.map((s) => s.company))];
  }, [schedules]);

  // Apply FILTER + SORTING (existing)
  const [sortBy, setSortBy] = useState<"departure" | "price" | null>(null);

  const filteredSchedules = useMemo(() => {
    let result = [...schedules];

    // --- COMPANY FILTER ---
    if (selectedCompany) {
      result = result.filter((s) => s.company === selectedCompany);
    }

    // --- EXISTING SORT ---
    if (sortBy === "departure") {
      result.sort(
        (a, b) =>
          new Date(a.departure).getTime() - new Date(b.departure).getTime()
      );
    } else if (sortBy === "price") {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [schedules, selectedCompany, sortBy]);

  const { t } = useTranslation();

  return (
    <>
      <div>{t("searchScehedule")}</div>

      <SearchForm onSearch={setFormInputs} />

      {isLoading && <Typography mt={2}>{t("loading")}</Typography>}

      {!isLoading && formInputs && (
        <ScheduleList
          list={filteredSchedules}
          companies={companies} // NEW
          selectedCompany={selectedCompany} // NEW
          onSelectCompany={setSelectedCompany} // NEW
          onSortByDeparture={() => setSortBy("departure")}
          onSortByPrice={() => setSortBy("price")}
        />
      )}
    </>
  );
}
