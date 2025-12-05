import SearchForm from "../components/SearchForm";
import ScheduleList from "../components/ScheduleList";
import { useState } from "react";

export default function SearchPage() {
  const [formInputs, setFormInputs] = useState<{
    from: string;
    to: string;
    date: string;
  } | null>(null);

  console.log("formInputs:", formInputs);

  return (
    <>
      <div>Sefer Ara:</div>
      <SearchForm onSearch={setFormInputs} />
      {formInputs && <ScheduleList />}
    </>
  );
}
