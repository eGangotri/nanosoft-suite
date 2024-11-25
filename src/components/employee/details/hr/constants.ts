import dayjs from 'dayjs';
import { z } from 'zod';


export interface AddEditHrDetailFormProps {
  employeeId: number
  initialData: EmployeeHrDetails
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
  passType: z.string().min(1).max(5),
  passExpiryDate: requiredDateSchema,
  renewalApplyDate: nullableDateSchema,
  newApplyDate: nullableDateSchema,
  passCancelledDate: nullableDateSchema,
  clientId: z.number().int().positive().nullable().optional(),
  remarks: z.string().nullable(),
});

//export type EmployeeHrDetailsFormData = Omit<EmployeeHrDetails, 'id' | 'employee' | 'client'>;
export type EmployeeHrDetailsFormData = z.infer<typeof employeeHrDetailsSchema>;

export const VALID_PASS_TYPES = ["EP", "PEP", "WP", "SPass"] as const;