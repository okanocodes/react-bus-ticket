import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTripStore } from "../store/useTripStore";
import { useTranslation } from "react-i18next";

export default function SuccessPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const reset = useTripStore((s) => s.reset);

  return (
    <Box p={3} textAlign="center">
      <Typography variant="h4" mb={2}>
        {t("success")}
      </Typography>
      <Typography>{t("tickedDone")}</Typography>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => {
          reset();
          navigate("/");
        }}
      >
        {t("backtoHome")}
      </Button>
    </Box>
  );
}
