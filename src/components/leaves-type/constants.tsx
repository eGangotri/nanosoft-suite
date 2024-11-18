import { GridColDef, } from '@mui/x-data-grid';
import * as z from 'zod'

export const leaveTypeSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    description: z.string().min(2, "Description must be at least 2 characters long").nullable(),
    default_days: z.coerce.number().int().nonnegative("Default days must be greater than 0"),
    leave_code: z.string().max(5, "Leave code must be 5 characters or less").optional()
  });
  
export type LeaveTypeInput = z.infer<typeof leaveTypeSchema>;
export const leaveTypesColumn: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 200, editable: true },
    { field: 'default_days', headerName: 'Default Days', width: 150, type: 'number', editable: true },
    { field: 'leave_code', headerName: 'Leave Code', width: 150, editable: true },
   
  ];
