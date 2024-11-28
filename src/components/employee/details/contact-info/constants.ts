import { z } from 'zod';
export interface EmergencyContactPageProps {
    employeeId: number;
    initialData?: EmployeeEmergencyContactFormData;
    onSubmit: (data: EmployeeEmergencyContactFormData) => void;
  }
  

export const employeeEmergencyContactSchema = z.object({
  employeeId: z.number().int().positive(),
  personName: z.string().min(1, "Person name is required").max(255),
  relationship: z.enum(['spouse', 'friend', 'parent', 'sibling', 'landlord', 'other']),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number"),
  address: z.string().min(1, "Address is required"),
});

export type EmployeeEmergencyContactFormData = z.infer<typeof employeeEmergencyContactSchema>;
