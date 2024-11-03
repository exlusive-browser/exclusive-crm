import { z } from "zod";

export interface Opportunity {
  id: number;
  // todo: Add Client type
  businessName: string;
  businessType: string;
  description: string;
  estimatedValue: number;
  estimatedStartDate: string;
  status: string;
}

export const CreateOpportunityInputSchema = z.object({
  businessName: z
    .string()
    .min(1, "business name is required")
    .max(255, "business name is too long"),
  description: z.string().optional().default(""),
  estimatedValue: z.coerce // to parse string values to numbers
    .number({ message: "estimated value must be a number" })
    .nonnegative("estimated value must be positive"),
});

export type CreateOpportunityInput = z.infer<
  typeof CreateOpportunityInputSchema
>;
