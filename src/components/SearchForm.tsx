import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/apiClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

const schema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  date: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function SearchForm({
  onSearch,
}: {
  onSearch: (d: FormData) => void;
}) {
  const { data: agencies = [] } = useQuery({
    queryKey: ["agencies"],
    queryFn: () => apiClient.get("/api/reference/agencies"),
  });
  console.log("agencies:", agencies);

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const date = watch("date");

  return (
    <Box
      component="form"
      display="flex"
      gap={2}
      padding={2}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onSubmit={handleSubmit(onSearch)}
    >
      <Autocomplete
        options={agencies}
        renderInput={(params) => <TextField {...params} label="Kalkış" />}
        getOptionLabel={(opt: any) => opt.name}
        onChange={(_, v: any) => setValue("from", v?.id || "")}
        sx={{ flex: 1 }}
      ></Autocomplete>
      <Autocomplete
        options={agencies}
        getOptionLabel={(opt: any) => opt.name}
        onChange={(_, v: any) => setValue("to", v?.id || "")}
        renderInput={(params) => <TextField {...params} label="Varış" />}
        sx={{ flex: 1 }}
      />

      <TextField
        type="date"
        label="Tarih"
        {...register("date")}
        slotProps={{
          input: {
            inputProps: {
              min: dayjs().format("YYYY-MM-DD"),
            },
          },
          inputLabel: { shrink: true },
        }}
        sx={{ flex: 1 }}
      />

      <Button variant="contained" type="submit" sx={{ alignSelf: "stretch" }}>
        Ara
      </Button>
    </Box>
  );
}
