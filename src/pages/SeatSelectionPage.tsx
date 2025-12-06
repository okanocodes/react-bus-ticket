import { useParams, useNavigate } from "react-router-dom";
import { useSeatSchema } from "../hooks/useSeatSchema";
import { Box, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import SeatMap from "../components/SeatMap";
import { useTripStore } from "../store/useTripStore";
import { useTranslation } from "react-i18next";

export default function SeatSelectionPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const selectedSeats = useTripStore((s) => s.selectedSeats);
  const trip = useTripStore((s) => s.selectedTrip);
  const { t } = useTranslation();

  const { data: schema, isLoading } = useSeatSchema(tripId!);

  if (!trip) return <Typography p={3}>Sefer bilgisi bulunamadı.</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        {t("seatSelection")}
      </Typography>

      {isLoading && <Typography>{t("loading")}</Typography>}

      {schema && (
        <Grid container spacing={4}>
          {/* Seat Map */}
          <Grid size={{ xs: 12, md: 8 }}>
            <SeatMap schema={schema} />
          </Grid>

          {/* Legend */}
          <Grid
            size={{ xs: 12, md: 4 }}
            marginTop={{ xs: 15, md: 10 }}
            sx={{
              position: "sticky",
              top: 90,
              alignSelf: "flex-start",
            }}
          >
            {/* Legend */}
            <Box mb={3}>
              <Box
                mt={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "grey.200",
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="caption">{t("empty")}</Typography>
                </Box>

                <Box>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "success.main",
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="caption">{t("selected")}</Typography>
                </Box>

                <Box>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "error.main",
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="caption">{t("occupied")}</Typography>
                </Box>

                <Box>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "#424242",
                      borderRadius: 0.5,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                    }}
                  >
                    <DoorBackOutlinedIcon />
                  </Box>
                  <Typography variant="caption">{t("door")}</Typography>
                </Box>
              </Box>
            </Box>

            {/* Selected Seats */}
            <Typography variant="h6">{t("selectedSeats")}:</Typography>
            <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
              {selectedSeats.length
                ? selectedSeats.map((s) => (
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "success.main",
                        borderRadius: 0.5,
                      }}
                      key={s}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        {s}
                      </Typography>
                    </Box>
                  ))
                : t("noSelectedSeats")}
            </Stack>

            {/* Button */}
            <Button
              variant="contained"
              fullWidth
              disabled={selectedSeats.length === 0}
              onClick={() => navigate("/summary")}
            >
              {t("continue")}
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
