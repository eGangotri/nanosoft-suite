import { z } from 'zod'

export const bankDetailsSchema = z.object({
    employeeId: z.number().int().positive(),
    bankName: z.string().min(1, 'Bank name is required'),
    employeeBankingName: z.string().min(1, 'Employee banking name is required'),
    accountNumber: z.string().min(1, 'Account number is required'),
    accountType: z.string().min(1, 'Account type is required'),
});


export type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;