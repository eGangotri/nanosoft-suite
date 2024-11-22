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
  const {  emergencyContacts, bankDetails, hrDetails, leaveBalances, workHistory, ...employee } = employeeData

  return (
    <Box className="max-w-6xl mx-auto p-6">
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Main Employee Information" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Name:</strong> {`${employee?.firstName} ${employee?.middleName || ''} ${employee?.lastName}`}</Typography>
            <Typography><strong>Designation:</strong> {employee?.designation}</Typography>
            <Typography><strong>Date of Birth:</strong> {employee?.dateOfBirth}</Typography>
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
        {hrDetails &&
          <Grid container spacing={2} key={hrDetails?.id}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Date of Joining:</strong> {hrDetails?.dateOfJoining}</Typography>
              <Typography><strong>Bonus:</strong> ${hrDetails?.bonus?.toFixed(2)}</Typography>
              <Typography><strong>Passport Number:</strong> {hrDetails?.passportNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Pass Type:</strong> {hrDetails?.passType}</Typography>
              <Typography><strong>Pass Expiry Date:</strong> {hrDetails?.passExpiryDate ? hrDetails?.passExpiryDate : 'N/A'}</Typography>
              <Typography><strong>Client:</strong> {hrDetails?.client ? hrDetails?.client.companyName : 'N/A'}</Typography>
            </Grid>
          </Grid>
        }
      </Paper>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Bank Details" />
        <Typography><strong>Bank Name:</strong> {bankDetails?.bankName}</Typography>
        <Typography><strong>Account Holder:</strong> {bankDetails?.employeeBankingName}</Typography>
        <Typography><strong>Account Number:</strong> {bankDetails?.accountNumber}</Typography>
        <Typography><strong>Account Type:</strong> {bankDetails?.accountType}</Typography>
      </Paper>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Emergency Contacts" />
        {emergencyContacts?.map((entry: EmployeeEmergencyContact) => (
          <Box key={entry?.id} mb={2}>
            <Typography><strong>Name:</strong> {entry?.personName}</Typography>
            <Typography><strong>Relationship:</strong> {entry?.relationship}</Typography>
            <Typography><strong>Mobile:</strong> {entry?.mobile}</Typography>
            <Typography><strong>Address:</strong> {entry?.address}</Typography>
          </Box>
        ))}
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
              {leaveBalances?.map((entry: EmployeeLeaveBalance) => (
                <TableRow key={entry?.id}>
                  <TableCell component="th" scope="row">
                    {entry?.leaveType?.name}
                  </TableCell>
                  <TableCell align="right">{entry?.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={3} className="p-6">
        <SectionHeader title="Work History" />
        {workHistory?.map((entry: EmployeeWorkHistory) => (
          <Box key={entry?.id} mb={2}>
            <Typography variant="subtitle1">{entry?.jobTitle}</Typography>
            <Typography><strong>Period:</strong> {entry?.startDate} - {entry?.endDate ? entry?.endDate : 'Present'}</Typography>
            <Typography><strong>Department:</strong> {entry?.department || 'N/A'}</Typography>
            <Typography><strong>Responsibilities:</strong> {entry?.responsibilities || 'N/A'}</Typography>
            <Typography><strong>Technologies:</strong> {entry?.technologiesUsed || 'N/A'}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  )
}