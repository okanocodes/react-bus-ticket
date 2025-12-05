import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Box,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const passengerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  idNo: z.string().min(5),
  gender: z.enum(["male", "female"]),
  email: z.string().email(),
  phone: z.string().min(10),
  kvkk: z.boolean().refine((v) => v === true, "KVKK onaylanmalı"),
});

type FormData = z.infer<typeof passengerSchema>;

export default function PassengerForm({
  onSubmit,
}: {
  onSubmit: (d: FormData) => void;
}) {
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
        label="Ad"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />
      <TextField
        label="Soyad"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />
      <TextField
        label="TCKN"
        {...register("idNo")}
        error={!!errors.idNo}
        helperText={errors.idNo?.message}
      />

      <TextField
        select
        label="Cinsiyet"
        defaultValue="male"
        {...register("gender")}
      >
        <MenuItem value="male">Erkek</MenuItem>
        <MenuItem value="female">Kadın</MenuItem>
      </TextField>

      <TextField
        label="E‑posta"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Telefon"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <FormControlLabel
        control={<Checkbox {...register("kvkk")} />}
        label="KVKK ve sözleşmeleri kabul ediyorum"
      />
      {errors.kvkk && <Box color="red">{errors.kvkk.message}</Box>}

      <button
        type="submit"
        style={{
          padding: "10px",
          background: "#1976d2",
          color: "white",
          border: 0,
          borderRadius: 4,
        }}
      >
        Devam Et
      </button>
    </Box>
  );
}
