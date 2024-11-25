import { z } from 'zod';


export interface AddEditHrDetailFormProps {
  employeeId: number
  initialData: EmployeeHrDetails
}

export const employeeHrDetailsSchema = z.object({
  employeeId: z.number().int().positive(),
  dateOfJoining: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  bonus: z.number().nonnegative(),
  passportNumber: z.string().min(1).max(20),
  passportIssueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  passportExpiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  passType: z.string().min(1).max(5),
  passExpiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  renewalApplyDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  newApplyDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  passCancelledDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  clientId: z.number().int().positive().nullable(),
  remarks: z.string().nullable(),
});

export type HrDetailsFormData = z.infer<typeof employeeHrDetailsSchema>;

