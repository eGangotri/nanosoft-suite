import dayjs from 'dayjs';
import { z } from 'zod';


export interface AddEditHrDetailFormProps {
  initialData: EmployeeHrDetailsFormData
  allClients: Client[]
}

export interface HrDetailsFormProps {
  initialData: EmployeeHrDetailsFormData;
  onSubmit: (data: EmployeeHrDetailsFormData) => void;
  allClients?: Client[];
  isLoading: boolean,
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
  employeeId: z.number().int().optional(),
  employee: z.object({}).optional(),
  dateOfJoining: requiredDateSchema,
  bonus: z.coerce.number().nonnegative(),
  salary: z.coerce.number().nonnegative(),
  passportNumber: z.string().min(1).max(20),
  passportIssueDate: requiredDateSchema,
  passportExpiryDate: requiredDateSchema,
  passType: z.string().nullable(),
  passExpiryDate: nullableDateSchema,
  renewalApplyDate: nullableDateSchema,
  newApplyDate: nullableDateSchema,
  passCancelledDate: nullableDateSchema,
  remarks: z.string().optional().nullable(),
  workpermitNumber: z.string().optional().nullable(),
  malaysiaIC: z.string().optional().nullable(),
  clientIds: z.array(z.number().int().positive()).optional(), // New field for client IDs
});

// New schema for the many-to-many relationship
export const employeeHrDetailsClientSchema = z.object({
  employeeHrId: z.number().int().positive(),
  clientId: z.number().int().positive(),
  assignedDate: z.date(),
});

export type EmployeeHrDetailsFormData = EmployeeHrDetails
