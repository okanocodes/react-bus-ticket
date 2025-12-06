import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Box,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { usePassengerSchema, type FormData } from "../hooks/usePassengerSchema";
const passengerSchema = usePassengerSchema();

export default function PassengerForm({
  onSubmit,
}: {
  onSubmit: (d: FormData) => void;
}) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(passengerSchema),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "grid", gap: 2 }}
    >
      <TextField
        label={t("firstname")}
        {...register("firstName")}
        error={!!errors.firstName}
      />
      {errors.firstName && (
        <Box
          component="p"
          color="red"
          margin="-10px 0 10px 14px!important"
          padding="0px"
          fontSize="0.75rem"
        >
          {t("firstnameError")}
        </Box>
      )}
      <TextField
        label={t("surname")}
        {...register("lastName")}
        error={!!errors.lastName}
      />
      {errors.lastName && (
        <Box
          component="p"
          color="red"
          margin="-10px 0 10px 14px!important"
          padding="0px"
          fontSize="0.75rem"
        >
          {t("surnameError")}
        </Box>
      )}
      <TextField
        label={t("idNumber")}
        {...register("idNo")}
        error={!!errors.idNo}
      />
      {errors.idNo && (
        <Box
          component="p"
          color="red"
          margin="-10px 0 10px 14px!important"
          padding="0px"
          fontSize="0.75rem"
        >
          {t("idNoError")}
        </Box>
      )}

      <TextField
        select
        label={t("gender")}
        defaultValue="male"
        {...register("gender")}
      >
        <MenuItem value="male">{t("male")}</MenuItem>
        <MenuItem value="female">{t("female")}</MenuItem>
      </TextField>

      <TextField
        label={t("email")}
        {...register("email")}
        error={!!errors.email}
      />
      {errors.phone && (
        <Box
          component="p"
          color="red"
          margin="-10px 0 10px 14px!important"
          padding="0px"
          fontSize="0.75rem"
        >
          {t("emailError")}
        </Box>
      )}
      <TextField
        label={t("phone")}
        {...register("phone")}
        error={!!errors.phone}
      />
      {errors.phone && (
        <Box
          component="p"
          color="red"
          margin="-10px 0 10px 14px!important"
          padding="0px"
          fontSize="0.75rem"
        >
          {t("phoneError")}
        </Box>
      )}

      <FormControlLabel
        control={<Checkbox {...register("kvkk")} />}
        label={t("kvkkText")}
      />
      {errors.kvkk && <Box color="red">{t("kvkkError")}</Box>}

      <Button type="submit" variant="contained">
        {t("payNow")}
      </Button>
    </Box>
  );
}
