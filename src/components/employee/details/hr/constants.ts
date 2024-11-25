import { z } from 'zod';


export interface AddEditHrDetailFormProps {
  employeeId: number
  initialData: EmployeeHrDetails
}

export const employeeHrDetailsSchema = z.object({
  employeeId: z.number().int().positive(),
  dateOfJoining: z.date(),
  bonus: z.number().nonnegative(),
  passportNumber: z.string().min(1).max(20),
  passportIssueDate: z.date(),
  passportExpiryDate: z.date(),
  passType: z.string().min(1).max(5),
  passExpiryDate: z.date().nullable(),
  renewalApplyDate: z.date().nullable(),
  newApplyDate: z.date().nullable(),
  passCancelledDate: z.date().nullable(),
  clientId: z.number().int().positive().nullable(),
  remarks: z.string().nullable(),
});

export type EmployeeHrDetailsFormData = Omit<EmployeeHrDetails, 'id' | 'employee' | 'client'>;
//export type EmployeeHrDetailsFormData = z.infer<typeof employeeHrDetailsSchema>;