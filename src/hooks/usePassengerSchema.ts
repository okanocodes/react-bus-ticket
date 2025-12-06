import { z } from "zod";

export const usePassengerSchema = () => {
  return z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    idNo: z.string().min(5),
    gender: z.enum(["male", "female"]),
    email: z.email(),
    phone: z.string().min(10),
    kvkk: z.boolean().refine((v) => v === true),
  });
};

export type FormData = z.infer<ReturnType<typeof usePassengerSchema>>;
