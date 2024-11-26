import { VALID_PASS_TYPES } from '@/utils/FormConsts';
import dayjs from 'dayjs';
import { z } from 'zod';


export interface AddEditHrDetailFormProps {
  employee: Employee
  initialData: EmployeeHrDetailsFormData
  clients: Client[]
}

// Base date schema
const baseDateSchema = z.preprocess((arg) => {
  if (typeof arg === "string" || arg instanceof Date) {
    return new Date(arg);
  }
  if (dayjs.isDayjs(arg)) {
    return arg.toDate();
  }
  return null;
}, z.date());

// Required date schema
const requiredDateSchema = baseDateSchema.refine((date) => date !== null, {
  message: "Date is required",
});

// Nullable date schema
const nullableDateSchema = baseDateSchema.nullable();

export const employeeHrDetailsSchema = z.object({
  employeeId: z.number().int().positive(),
  dateOfJoining: requiredDateSchema,
  bonus: z.coerce.number().nonnegative(),
  passportNumber: z.string().min(1).max(20),
  passportIssueDate: requiredDateSchema,
  passportExpiryDate: requiredDateSchema,
  passType: z.union([z.enum(VALID_PASS_TYPES as [string, ...string[]]), z.null(),z.literal('')]),
  passExpiryDate: nullableDateSchema,
  renewalApplyDate: nullableDateSchema,
  newApplyDate: nullableDateSchema,
  passCancelledDate: nullableDateSchema,
  clientId: z.number().int().positive().nullable().optional(),
  remarks: z.string().nullable(),
});

//export type EmployeeHrDetailsFormData = Omit<EmployeeHrDetails, 'id' | 'employee' | 'client'>;
//export type EmployeeHrDetailsFormData = z.infer<typeof employeeHrDetailsSchema>;
export type EmployeeHrDetailsFormData = EmployeeHrDetails
