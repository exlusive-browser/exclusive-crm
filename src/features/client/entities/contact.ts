import { z } from "zod";

export interface Contact {
  firstName: string;
  lastName: string;
  emailC: string;
  phoneC: string;
}

export const ContactUpadteunityInputSchema = z.object({
  firstName: z
    .string()
    .min(1, " Name is required")
    .max(255, " Name is too long"),
  lastName: z
    .string()
    .min(1, " Name is required")
    .max(255, " Name is too long"),
  phoneC: z.string().min(1, "Phone is required").max(255, "Phone is too long"),
  emailC: z.string().email("Invalid email"),
});

export type ContactUpadteunityInput = z.infer<
  typeof ContactUpadteunityInputSchema
>;
