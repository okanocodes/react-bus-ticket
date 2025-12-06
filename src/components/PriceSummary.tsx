import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PriceSummary({
  seatCount,
  unitPrice,
}: {
  seatCount: number;
  unitPrice: number;
}) {
  const { t } = useTranslation();

  const total = seatCount * unitPrice;
  return (
    <Box mt={2}>
      <Typography>
        {t("unitPrice")}: {unitPrice} TL
      </Typography>
      <Typography>
        {t("seatCount")}: {seatCount}
      </Typography>
      <Typography variant="h6" mt={1}>
        {t("total")}: {total} TL
      </Typography>
    </Box>
  );
}
