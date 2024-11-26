import { styled } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import * as z from 'zod';
import dayjs from 'dayjs';

export type CitizenshipStatus = 'citizen' | 'pr' | 'foreigner'
export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Defacto' | 'Separated'

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  middleName: z.string().default("").optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation must be at least 2 characters'),
  dateOfBirth: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg); // Convert string or Date to Date object
    }
    if (dayjs.isDayjs(arg)) {
      return arg.toDate(); // Convert dayjs object to Date
    }
    return null; // Fallback for invalid types
  }, z.date().refine((date) => date <= new Date() && date >= new Date(1900, 0, 1), 'Invalid date of birth')),


  nationality: z.string().min(2, 'Nationality must be at least 2 characters'),
  email: z.string().email('Invalid email address').regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format'),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number'),
  citizenshipStatus: z.enum(['citizen', 'pr', 'foreigner']),
  nricOrFinNo: z.string().regex(/^[STFGM]\d{7}[A-Za-z]$/, 'Invalid NRIC/FIN format'),
  expiryDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg); // Convert string or Date to Date object
    }
    if (dayjs.isDayjs(arg)) {
      return arg.toDate(); // Convert dayjs object to Date
    }
    return null; // Fallback for invalid types
  }, z.date().optional()),
  maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Defacto', 'Separated']),
  addressLine1: z.string().min(1, 'Address Line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().regex(/^\d{5,9}$/, 'Invalid postal code'),
  deleted: z.boolean().default(false).optional(),
  active: z.boolean().default(true).optional(),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

export interface EmployeeFormProps {
  initialData?: EmployeeFormData
  onSubmit: (data: EmployeeFormData) => Promise<void>
}

export
    const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
        '& .inactive-row': {
            backgroundColor: 'rgba(254, 202, 202, 0.5)', // Light red color for inactive rows
            '&:hover': {
                backgroundColor: 'rgba(254, 202, 202, 0.7)', // Darker red on hover for inactive rows
            },
            '&.Mui-selected': {
                backgroundColor: 'rgba(254, 202, 202, 0.8)', // Even darker red for selected inactive rows
                '&:hover': {
                    backgroundColor: 'rgba(254, 202, 202, 0.9)', // Darkest red on hover for selected inactive rows
                },
            },
        },
        '& .even-row': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light gray for even rows
        },
        '& .odd-row': {
            backgroundColor: 'rgba(255, 255, 255, 1)', // White for odd rows
        },
        '& .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }));
