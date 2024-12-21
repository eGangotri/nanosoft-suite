import { z } from 'zod'

export const confirmLetterSchema = z.object({
  salutation: z.enum(['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  isForeigner: z.boolean(),
  identificationNumber: z.string().min(1, "This field is required"),
  position: z.string().min(1, "Position is required"),
  salary: z.number().positive("Salary must be a positive number"),
  joiningDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  leaves: z.number().int().nonnegative("Leaves must be a non-negative integer"),
  noticePeriod: z.number().int().positive("Notice period must be a positive integer"),
  workingHours: z.number().positive("Working hours must be a positive number"),
})

export type ConfirmLetterData = z.infer<typeof confirmLetterSchema>

