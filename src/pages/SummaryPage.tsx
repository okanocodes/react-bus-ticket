import { Box, Typography } from "@mui/material";
import PassengerForm from "../components/PassengerForm";
import PriceSummary from "../components/PriceSummary";
import { useTripStore } from "../store/useTripStore";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../services/apiClient";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function SummaryPage() {
  const trip = useTripStore((s) => s.selectedTrip);
  const seats = useTripStore((s) => s.selectedSeats);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formattedDeparture = dayjs(trip?.departure).format("DD/MM/YYYY HH:mm");
  const formattedArrival = dayjs(trip?.arrival).format("DD/MM/YYYY HH:mm");

  if (!trip) return <Typography p={3}>{t("scheduleNotFound")}</Typography>;

  const handlePay = async (form: any) => {
    const payload = {
      tripId: trip.id,
      seats,
      contact: { email: form.email, phone: form.phone },
      passengers: seats.map((seat) => ({
        seat,
        firstName: form.firstName,
        lastName: form.lastName,
        idNo: form.idNo,
        gender: form.gender,
      })),
    };

    const res = await apiClient.post("/api/tickets/sell", payload);
    if (res.ok) navigate("/success");
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" mb={2}>
        {t("summary")}
      </Typography>

      <Typography variant="h6">Sefer: {trip.company}</Typography>
      <Typography>
        {formattedDeparture} → {formattedArrival}
      </Typography>
      <Typography>
        {t("seats")}: {seats.join(", ")}
      </Typography>

      <PriceSummary seatCount={seats.length} unitPrice={trip.price} />

      <Box mt={3}>
        <PassengerForm onSubmit={handlePay} />
      </Box>
    </Box>
  );
}
