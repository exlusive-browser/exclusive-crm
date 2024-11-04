import { z } from "zod";

export interface Client {
  id: number;
  nit: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  corporateEmail: string;
  active: boolean;
}

export const ClientUpadteunityInputSchema = z.object({
  nit: z
    .string()
    .min(1, "Business name is required")
    .max(255, "Business name is too long"),
  name: z.string().min(1, " Name is required").max(255, " Name is too long"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address is too long"),
  city: z
    .string()
    .min(1, "City name is required")
    .max(255, "City name is too long"),
  country: z
    .string()
    .min(1, "Country name is required")
    .max(255, "Country name is too long"),
  phone: z.string().min(1, "Phone is required").max(255, "Phone is too long"),
  corporateEmail: z.string().email("Invalid email"),
});

export type ClientUpadteunityInput = z.infer<
  typeof ClientUpadteunityInputSchema
>;
