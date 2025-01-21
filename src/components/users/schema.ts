import * as z from 'zod'

// Define the form schema using Zod
export const userSchema = z.object({
    tenantName: z.string().min(1, 'Tenant is required'),
    roleName: z.string().optional(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    employeeId: z.string().optional(),
    employeeName: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters').optional(),
  })
  
  export type UserFormData = z.infer<typeof userSchema>
  
  export interface Tenant {
    id: number
    name: string
  }
  