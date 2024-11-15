import * as z from 'zod'

export const leaveTypeSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    description: z.string().min(2, "Description must be at least 2 characters long").nullable(),
    default_days: z.coerce.number().int().nonnegative("Default days must be greater than 0"),
    leave_code: z.string().max(5, "Leave code must be 5 characters or less").optional()
  });
  
export type LeaveTypeInput = z.infer<typeof leaveTypeSchema>;