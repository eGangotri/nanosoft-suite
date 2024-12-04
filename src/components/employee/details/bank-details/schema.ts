import { z } from 'zod'

export interface AddEditBankDetailsFormProps {
  employeeId: number
  initialData: BankDetailsFormData
}

export interface BankDetailsFormProps {
  employeeId: number
  initialData?: BankDetailsFormData
  onSubmit: (data: BankDetailsFormData) => void
  isEditing: boolean,
}

export const bankDetailsSchema = z.object({
  employeeId: z.number().int().positive(),
  bankName: z.string().min(1, 'Bank name is required'),
  employeeBankingName: z.string().min(1, 'Employee banking name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  accountType: z.string().min(1, 'Account type is required'),
});


export type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;
