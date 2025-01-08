import { z } from 'zod';

export const claimSchema = z.object({
  employeeId: z.number().int().positive(),
  amount: z.number().positive(),
  description: z.string().min(1, "Description is required"),
  date: z.date(),
});

export type ClaimFormData = z.infer<typeof claimSchema>;

