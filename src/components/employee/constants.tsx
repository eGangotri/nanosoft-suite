import { styled } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid'
import * as z from 'zod';
import dayjs from 'dayjs';
import {
  CITIZEN_CATEGORIES,
  CITIZEN_CATEGORIES_VALUES,
  GENDER_TYPE_VALUES,
  MARITAL_CATEGORIES_VALUES,
  NATIONALITY_VALUES,
  RACE_TYPE_VALUES
} from "@/utils/FormConsts";


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

  nationality: z.enum(NATIONALITY_VALUES as [string, ...string[]]),
  email: z.string().email('Invalid email address').regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format'),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number'),
  citizenshipStatus: z.enum(CITIZEN_CATEGORIES_VALUES as [string, ...string[]]),
  race: z.enum(RACE_TYPE_VALUES as [string, ...string[]]),
  gender: z.enum(GENDER_TYPE_VALUES as [string, ...string[]]),
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
  maritalStatus: z.enum(MARITAL_CATEGORIES_VALUES as [string, ...string[]]),
  deleted: z.boolean().default(false).optional(),
  active: z.boolean().default(true).optional(),

  localAddressLine1: z.string().min(1, 'Address Line 1 is required'),
  localAddressLine2: z.string().min(1, 'Address Line 1 is required'),
  localPostalCode: z.string().regex(/^\d{5,9}$/, 'Invalid postal code'),

  foreignAddressLine1: z.string().optional(),
  foreignAddressLine2: z.string().optional(),
  foreignAddressCity: z.string().optional(),
  foreignAddressState: z.string().optional(),
  foreignAddressCountry: z.string().optional(),
  foreignAddressPostalCode: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.citizenshipStatus !== CITIZEN_CATEGORIES.Citizen) {
    if (!data.foreignAddressLine1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['foreignAddressLine1'],
        message: 'Foreign Address Line 1 is required when active is true',
      });
    }
    if (!data.foreignAddressLine2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['foreignAddressLine2'],
        message: 'Foreign Address Line 2 is required when citizenship status is not Citizen',
      });
    }
    if (!data.foreignAddressCity) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['foreignAddressCity'],
        message: 'Foreign Address City is required when citizenship status is not Citizen',
      });
    }
    if (!data.foreignAddressState) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['foreignAddressState'],
        message: 'Foreign Address City is required when citizenship status is not Citizen',
      });
    }

    if (!data.foreignAddressCountry) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['foreignAddressCountry'],
        message: 'Foreign Address Country is required when citizenship status is not Citizen',
      });
    }
    if (!data.foreignAddressPostalCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['foreignAddressPostalCode'],
        message: 'Foreign Address Postal Code is required when citizenship status is not Citizen',
      });
    }
  }
});

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
