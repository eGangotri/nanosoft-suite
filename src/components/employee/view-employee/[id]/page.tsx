'use client'

import React from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EmployeeData } from '../../types';

interface EmployeeViewProps {
  employeeData: EmployeeData;
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
    <Typography variant="h6">{title}</Typography>
    <Box>
      <IconButton size="small">
        <EditIcon />
      </IconButton>
      <IconButton size="small">
        <DeleteIcon />
      </IconButton>
    </Box>
  </Box>
);

const EmployeeView: React.FC<EmployeeViewProps> = ({ employeeData }) => {
  const { employee, hrDetails, emergencyContact, bankDetails, leaveBalances, workHistory } = employeeData;

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <SectionHeader title="Main Employee Information" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Name:</strong> {`${employee.first_name} ${employee.middle_name || ''} ${employee.last_name}`}</Typography>
            <Typography><strong>Designation:</strong> {employee.designation}</Typography>
            <Typography><strong>Date of Birth:</strong> {employee.date_of_birth}</Typography>
            <Typography><strong>Nationality:</strong> {employee.nationality}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Email:</strong> {employee.email}</Typography>
            <Typography><strong>Mobile:</strong> {employee.mobile}</Typography>
            <Typography><strong>NRIC/FIN:</strong> {employee.nric_or_fin_no}</Typography>
            <Typography><strong>Marital Status:</strong> {employee.marital_status}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <SectionHeader title="HR Details" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Date of Joining:</strong> {hrDetails.date_of_joining}</Typography>
            <Typography><strong>Bonus:</strong> ${hrDetails.bonus.toFixed(2)}</Typography>
            <Typography><strong>Passport Number:</strong> {hrDetails.passport_number}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Pass Type:</strong> {hrDetails.pass_type}</Typography>
            <Typography><strong>Pass Expiry Date:</strong> {hrDetails.pass_expiry_date || 'N/A'}</Typography>
            <Typography><strong>Client ID:</strong> {hrDetails.client_id || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <SectionHeader title="Emergency Contact" />
        <Typography><strong>Name:</strong> {emergencyContact.person_name}</Typography>
        <Typography><strong>Relationship:</strong> {emergencyContact.relationship}</Typography>
        <Typography><strong>Mobile:</strong> {emergencyContact.mobile}</Typography>
        <Typography><strong>Address:</strong> {emergencyContact.address}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <SectionHeader title="Bank Details" />
        <Typography><strong>Bank Name:</strong> {bankDetails.bank_name}</Typography>
        <Typography><strong>Account Holder:</strong> {bankDetails.employee_banking_name}</Typography>
        <Typography><strong>Account Number:</strong> {bankDetails.account_number}</Typography>
        <Typography><strong>Account Type:</strong> {bankDetails.account_type}</Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <SectionHeader title="Leave Balances" />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Leave Type ID</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveBalances.map((balance) => (
                <TableRow key={balance.id}>
                  <TableCell component="th" scope="row">
                    {balance.leave_type_id}
                  </TableCell>
                  <TableCell align="right">{balance.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <SectionHeader title="Work History" />
        {workHistory.map((entry) => (
          <Box key={entry.id} sx={{ marginBottom: 2 }}>
            <Typography variant="subtitle1">{entry.job_title}</Typography>
            <Typography><strong>Period:</strong> {entry.start_date} - {entry.end_date || 'Present'}</Typography>
            <Typography><strong>Department:</strong> {entry.department || 'N/A'}</Typography>
            <Typography><strong>Responsibilities:</strong> {entry.responsibilities || 'N/A'}</Typography>
            <Typography><strong>Technologies:</strong> {entry.technologies_used || 'N/A'}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default EmployeeView;