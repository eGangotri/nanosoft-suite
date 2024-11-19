import { z } from 'zod';

export const bankDetailsSchema = z.object({
    employee_id: z.coerce.number().int().positive(),
    bank_name: z.string().min(1, 'Bank name is required'),
    employee_banking_name: z.string().min(1, 'Employee banking name is required'),
    account_number: z.string().min(1, 'Account number is required'),
    account_type: z.enum(['Current', 'Savings']),
  })
  
  export type BankDetailsFormData = z.infer<typeof bankDetailsSchema>
  