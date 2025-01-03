import { z } from 'zod'

export const loanApplicationSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  reason: z.string().min(10, 'Reason must be at least 10 characters long'),
  month: z.number().min(1).max(12),
  year: z.number().min(new Date().getFullYear()),
})

export type LoanApplicationFormData = z.infer<typeof loanApplicationSchema>

