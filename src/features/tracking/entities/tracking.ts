import { z } from "zod";

export interface TrackingActivity {
  id: number;
  opportunityId: number;
  contactType: string;
  contactDate: string;
  clientContactId: number;
  salesExecutive: string;
  description: string;
}

export const CreateTrackingActivityInputSchema = z.object({
  opportunityId: z.number().nonnegative("opportunity ID must be positive"),
  contactType: z.enum(["Phone Call", "Email", "In-person meeting"]),
  contactDate: z
    .string()
    .min(1, "Contact date is required")
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Contact date must be a valid date",
    }),

  clientContactId: z.number().nonnegative("client contact ID must be positive"),
  salesExecutive: z.string().min(1, "sales executive name is required"),
  description: z.string().optional().default(""),
});


export const UpdateTrackingActivityInputSchema = z.object({
  contactType: z.enum(["Phone Call", "Email", "In-person meeting"]),
  contactDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "contact date must be a valid date",
  }),
  clientContactId: z.number().nonnegative("client contact ID must be positive"),
  salesExecutive: z.string().min(1, "sales executive name is required"),
  description: z.string().optional().default(""),
});

export type CreateTrackingActivityInput = z.infer<
  typeof CreateTrackingActivityInputSchema
>;

export type UpdateTrackingActivityInput = z.infer<
  typeof UpdateTrackingActivityInputSchema
>;
