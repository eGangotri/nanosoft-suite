import { EMERGENCY_CONTACT_CATEGORIES_VALUES } from '@/utils/FormConsts';
import { z } from 'zod';
export interface EmergencyContactPageProps {
  employeeId: number;
  initialData?: EmployeeEmergencyContactFormData;
  onSubmit?: (data: EmployeeEmergencyContactFormData) => void;
}


export const employeeEmergencyContactSchema = z.object({
  id: z.number().int().nonnegative().optional(), // Optional id field
  employeeId: z.number().int().positive(),
  personName: z.string().min(1, "Person name is required").max(255),
  relationship: z.enum(EMERGENCY_CONTACT_CATEGORIES_VALUES as [string, ...string[]]),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number"),
  address: z.string().min(1, "Address is required"),
});

export type EmployeeEmergencyContactFormData = z.infer<typeof employeeEmergencyContactSchema>;
//export type EmployeeEmergencyContactFormData = EmployeeEmergencyContact;
