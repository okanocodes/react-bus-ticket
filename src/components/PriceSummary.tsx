import { Box, Typography } from "@mui/material";

export default function PriceSummary({
  seatCount,
  unitPrice,
}: {
  seatCount: number;
  unitPrice: number;
}) {
  const total = seatCount * unitPrice;
  return (
    <Box mt={2}>
      <Typography>Birim Fiyat: {unitPrice} TL</Typography>
      <Typography>Koltuk Sayısı: {seatCount}</Typography>
      <Typography variant="h6" mt={1}>
        Toplam: {total} TL
      </Typography>
    </Box>
  );
}
