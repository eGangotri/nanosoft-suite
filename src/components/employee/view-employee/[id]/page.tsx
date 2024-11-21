'use client'

import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
}
  from '@mui/icons-material';
import {
  EmployeeData,
  EmployeeHRDetails,
  EmployeeEmergencyContact,
  EmployeeBankDetails,
  EmployeeLeaveBalance,
  EmployeeWorkHistory
}
  from '../../types';

interface EmployeeViewProps {
  employeeData: EmployeeData
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <Typography variant="h6">{title}</Typography>
    <Box>
      <IconButton size="small">
        <EditIcon className="h-4 w-4" />
      </IconButton>
      <IconButton size="small">
        <DeleteIcon className="h-4 w-4" />
      </IconButton>
    </Box>
  </Box>
)

export default function EmployeeView({ employeeData }: EmployeeViewProps) {
  const { employee, employee_bank_details, employee_emergency_contact, employee_hr_details, employee_leave_balances, employee_work_history } = employeeData

  return (
    <Box className="max-w-6xl mx-auto p-6">
      <Typography variant="h4" gutterBottom>
        Employee Details {JSON.stringify(employee)}
      </Typography>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Main Employee Information" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Name:</strong> {`${employee?.firstName} ${employee?.middleName || ''} ${employee?.lastName}`}</Typography>
            <Typography><strong>Designation:</strong> {employee?.designation}</Typography>
            <Typography><strong>Date of Birth:</strong> {employee?.dateOfBirth?.toDateString()}</Typography>
            <Typography><strong>Nationality:</strong> {employee?.nationality}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Email:</strong> {employee?.email}</Typography>
            <Typography><strong>Mobile:</strong> {employee?.mobile}</Typography>
            <Typography><strong>NRIC/FIN:</strong> {employee?.nricOrFinNo}</Typography>
            <Typography><strong>Marital Status:</strong> {employee?.maritalStatus}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="HR Details" />
        {employee_hr_details &&
          <Grid container spacing={2} key={employee_hr_details?.id}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Date of Joining:</strong> {employee_hr_details?.date_of_joining?.toDateString()}</Typography>
              <Typography><strong>Bonus:</strong> ${employee_hr_details?.bonus?.toFixed(2)}</Typography>
              <Typography><strong>Passport Number:</strong> {employee_hr_details?.passport_number}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Pass Type:</strong> {employee_hr_details?.pass_type}</Typography>
              <Typography><strong>Pass Expiry Date:</strong> {employee_hr_details?.pass_expiry_date ? employee_hr_details?.pass_expiry_date?.toDateString() : 'N/A'}</Typography>
              <Typography><strong>Client:</strong> {employee_hr_details?.client ? employee_hr_details?.client.company_name : 'N/A'}</Typography>
            </Grid>
          </Grid>
        }
      </Paper>
      
      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Bank Details" />
        <Typography><strong>Bank Name:</strong> {employee_bank_details?.bank_name}</Typography>
        <Typography><strong>Account Holder:</strong> {employee_bank_details?.employee_banking_name}</Typography>
        <Typography><strong>Account Number:</strong> {employee_bank_details?.account_number}</Typography>
        <Typography><strong>Account Type:</strong> {employee_bank_details?.account_type}</Typography>
      </Paper>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Emergency employee_emergency_contacts" />
        <Box key={employee_emergency_contact?.id} mb={2}>
          <Typography><strong>Name:</strong> {employee_emergency_contact?.person_name}</Typography>
          <Typography><strong>Relationship:</strong> {employee_emergency_contact?.relationship}</Typography>
          <Typography><strong>Mobile:</strong> {employee_emergency_contact?.mobile}</Typography>
          <Typography><strong>Address:</strong> {employee_emergency_contact?.address}</Typography>
        </Box>
      </Paper>



      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Leave Balances" />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Leave Type</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={employee_leave_balances?.id}>
                <TableCell component="th" scope="row">
                  {employee_leave_balances?.Leave_Type?.name}
                </TableCell>
                <TableCell align="right">{employee_leave_balances?.balance}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={3} className="p-6">
        <SectionHeader title="Work History" />
        {employee_work_history?.map((entry: EmployeeWorkHistory) => (
          <Box key={entry?.id} mb={2}>
            <Typography variant="subtitle1">{entry?.job_title}</Typography>
            <Typography><strong>Period:</strong> {entry?.start_date?.toDateString()} - {entry?.end_date ? entry?.end_date?.toDateString() : 'Present'}</Typography>
            <Typography><strong>Department:</strong> {entry?.department || 'N/A'}</Typography>
            <Typography><strong>Responsibilities:</strong> {entry?.responsibilities || 'N/A'}</Typography>
            <Typography><strong>Technologies:</strong> {entry?.technologies_used || 'N/A'}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  )
}