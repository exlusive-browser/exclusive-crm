import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ClientUpadteunityInput, ClientUpadteunityInputSchema } from "./client";

import {
  ContactUpadteunityInput,
  ContactUpadteunityInputSchema,
} from "./contact";

export const CombinedSchema = ClientUpadteunityInputSchema.merge(
  ContactUpadteunityInputSchema
);

export type CombinedInput = z.infer<typeof CombinedSchema>;
