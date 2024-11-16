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
  estimatedValue: z.coerce 
    .number({ message: "estimated value must be a number" })
    .nonnegative("estimated value must be positive"),
});

export const UpdateOpportunityInputSchema = z.object({
  businessName: z
    .string()
    .min(1, "business name is required")
    .max(255, "business name is too long"),
  description: z.string().optional().default(""),
  estimatedValue: z.coerce 
    .number({ message: "estimated value must be a number" })
    .nonnegative("estimated value must be positive"),
  businessType: z.enum([
    "Resource Outsourcing",
    "Web Development",
    "Mobile Development",
    "IT Consulting",
    "IT Services"
  ]),
  estimatedStartDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "estimated start date must be a valid date",
  }),
  status: z.enum(["Pending", "In Negotiation", "Closed", "Approved"]),
  
});

export type CreateOpportunityInput = z.infer<
  typeof CreateOpportunityInputSchema
>;

export type UpdateOpportunityInput = z.infer<
  typeof UpdateOpportunityInputSchema
>;
