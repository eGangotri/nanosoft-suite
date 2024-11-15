import { z } from 'zod'

export const LeaveTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be 100 characters or less"),
  description: z.string().min(2, "Description must be at least 2 characters").max(500, "Description must be 500 characters or less").nullable(),
  default_days: z.number().int().min(0, "Default days must be a non-negative integer"),
  leave_code: z.string().min(1, "Leave code is required").max(5, "Leave code must be 5 characters or less")
})

export type LeaveTypeInput = z.infer<typeof LeaveTypeSchema>