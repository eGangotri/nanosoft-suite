'use client'

import React, { useEffect, useState } from 'react'
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
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material'
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Block as DeactivateIcon,
  Restore as ActivateIcon

}
  from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter, formatStringAsDate } from '@/utils/StringUtils';
import dayjs from 'dayjs';
import { formatedEmployeeName, initCaps } from '../../EmployeeUtils';
import { CITIZEN_CATEGORIES, getCitizenBgColor, isForeigner } from '@/utils/FormConsts';

interface EmployeeViewProps {
  employeeData: EmployeeData
}

const DETAIL_TYPE_ENUM = {
  EMPLOYEE_DETAILS: 'employee-details',
  BANK_DETAILS: 'bank-details',
  EMERGENCY_CONTACTS: 'emergency-contacts',
  HR_DETAILS: 'hr-details',
  LEAVE_BALANCES: 'leave-balances',
  WORK_HISTORY: 'work-history'
}

export default function EmployeeView({ employeeData }: EmployeeViewProps) {
  const router = useRouter();
  const [loadingStates, setLoadingStates] = useState<{ [key: number | string]: boolean }>({});
  const [backgroundColor, setBackgroundColor] = useState("Citizen");
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    setBackgroundColor(getCitizenBgColor(employeeData.citizenshipStatus, employeeData?.active))
    console.log("backgroundColor", backgroundColor);
  }, [employeeData]);

  const setLoading = (id: number | string, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [id]: isLoading }))
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const executeDeletion = async (employeeId: number, deletePath: string, deleteEmp = false) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setLoading(`del-${employeeId}`, true)
      try {
        const response = await fetch(deletePath, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deleted: true }),
        })
        setLoading(`del-${employeeId}`, false)
        if (!response.ok) {
          console.error('Error deleting:', response.statusText)
          setSnackbarMessage('Deletion failed')
          setSnackbarSeverity('error')
          setOpenSnackbar(true)
          throw new Error('Failed to delete')
        }
        setSnackbarMessage('Deletion successfully')
        setSnackbarSeverity('success')
        setOpenSnackbar(true)
        if (deleteEmp) {
          router.push(`/employee`)
        }
        else {
          router.replace(`/employee/employee/view-employee/${employeeId}`);
          window.location.reload();
        }
      } catch (error) {
        setLoading(`del-${employeeId}`, false)
        console.error('Error deleting employee:', error)
        setSnackbarMessage('Deletion failed')
        setSnackbarSeverity('error')
        setOpenSnackbar(true)
      }
    }
  }

  const handleActivation = async (employeeId: number, activate = false) => {
    const action = activate ? 'reactivate' : 'deactivate'
    if (window.confirm(`Are you sure you want to ${action} this employee?`)) {
      setLoading(`${action}-${employeeId}`, true)
      try {
        const response = await fetch(`/api/employee/${employeeId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ active: activate }),
        })
        setLoading(`${action}-${employeeId}`, false)
        if (!response.ok) {
          console.error('Error changing active status:', response.statusText)
          throw new Error('Failed changing active status')
        }
        window.alert(`${capitalizeFirstLetter(action)} Successful`);
        window.location.reload();
      } catch (error) {
        setLoading(`${action}-${employeeId}`, false)
        window.alert(`Error changing active status for employee:${error}`)
        console.error('Error changing active status for employee:', error)
      }
    }
  }

  const SectionHeader: React.FC<{
    title: string,
    detailType: string,
    employeeId: number,
    detailId: number
    className?: string
  }> = ({ title, detailType, employeeId, detailId, className }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} className={className}>
      <Typography variant="h6">{title}</Typography>
      <Box>
        <IconButton size="small" onClick={() => handleAddEdit(detailType, employeeId)}>
          {(detailId && (detailId !== 0)) ? <EditIcon className="h-4 w-4" /> : <AddIcon className="h-4 w-4" />}
        </IconButton>
        {(detailId && (detailId > 0)) && <IconButton size="small"
          onClick={() => handleDelete(detailType, employeeId)}>
          {loadingStates[`del-${employeeId}`] ? <CircularProgress size={24} /> :
            <DeleteIcon className="h-4 w-4" />
          }
        </IconButton>}
        {/*implies Employee*/}
        {(detailId == -1) &&
          <>
            <IconButton aria-label="delete" color="error"
              onClick={() => handleDelete(detailType, employeeId)}
              disabled={loadingStates[`delete-${employeeId}`]}
            >
              {loadingStates[`delete-${employeeId}`] ? <CircularProgress size={24} /> :
                <DeleteIcon className="h-4 w-4" />
              }
            </IconButton>
            {employee.active ?
              <IconButton aria-label="deactivate" color="warning"
                onClick={() => handleActivation(employeeId, false)}
                disabled={loadingStates[`deactivate-${employeeId}`]}
              >
                {loadingStates[`deactivate-${employeeId}`] ? <CircularProgress size={24} /> :
                  <DeactivateIcon className="h-4 w-4" />
                }
              </IconButton>
              :
              <IconButton aria-label="reactivate" color="success"
                disabled={loadingStates[`reactivate-${employeeId}`]}
                onClick={() => handleActivation(employeeId, true)}
              >
                {loadingStates[`reactivate-${employeeId}`] ? <CircularProgress size={24} /> :
                  <ActivateIcon className="h-4 w-4" />
                }
              </IconButton>
            }

          </>
        }
      </Box>
    </Box>
  )
  const { EmployeeEmergencyContact, EmployeeBankDetails: EmployeeBankDetails, EmployeeHrDetails, EmployeeLeaveBalance: EmployeeLeaveBalance, EmployeeWorkHistory: EmployeeWorkHistory, ...employee } = employeeData

  const handleAddEdit = (detailType: string, employeeId: number) => {
    switch (detailType) {
      case DETAIL_TYPE_ENUM.EMPLOYEE_DETAILS:
        router.push(`/employee/employee/edit-employee?id=${employeeId}`)
        break;
      case DETAIL_TYPE_ENUM.HR_DETAILS:
        router.push(`/employee/details/hr-details/add-edit/${employeeId}?id=${employeeId}`)
        break;
      case DETAIL_TYPE_ENUM.BANK_DETAILS:
        router.push(`/employee/details/bank-details/add-edit/${employeeId}?id=${employeeId}`)
        break;
      case DETAIL_TYPE_ENUM.EMERGENCY_CONTACTS:
        router.push(`/employee/details/emergency-contacts/add-edit/${employeeId}?id=${employeeId}`)
        break;
      case DETAIL_TYPE_ENUM.LEAVE_BALANCES:
        router.push(`/employee/details/leave-balances/add-edit/${employeeId}?id=${employeeId}`)
        break;
      case DETAIL_TYPE_ENUM.WORK_HISTORY:
        router.push(`/employee/details/work-history/add-edit/${employeeId}?id=${employeeId}`)
        break;
      default:
        break;
    }
  }

  const handleDelete = (detailType: string, employeeId: number) => {
    switch (detailType) {
      case DETAIL_TYPE_ENUM.EMPLOYEE_DETAILS:
        executeDeletion(employeeId, `/api/employee/${employeeId}`, true)
        router.push(`/employee/employee`)
        break;
      case DETAIL_TYPE_ENUM.BANK_DETAILS:
        executeDeletion(employeeId, `/api/employee/details/bank-details/${employeeId}`)
        break;
      case DETAIL_TYPE_ENUM.EMERGENCY_CONTACTS:
        break;
      case DETAIL_TYPE_ENUM.HR_DETAILS:
        break;
      case DETAIL_TYPE_ENUM.LEAVE_BALANCES:
        break;
      case DETAIL_TYPE_ENUM.WORK_HISTORY:
        break;
      default:
        break;
    }
  }

  return (
    <Box className={`max-w-6xl mx-auto p-6 ${backgroundColor}`}>
      <Typography variant="h4" gutterBottom>
        Employee Details for {employee?.firstName} {employee?.lastName} ({employee.citizenshipStatus})
      </Typography>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Main Employee Information"
          detailType={DETAIL_TYPE_ENUM.EMPLOYEE_DETAILS}
          employeeId={employee?.id} detailId={-1} />
        <Grid container spacing={2} >
          <Grid item xs={12} sm={6} >
            <Typography><strong>Name:</strong> {`${formatedEmployeeName(employee)}`}</Typography>
            <Typography><strong>Designation:</strong> {employee?.designation}</Typography>
            <Typography><strong>Date of Birth:</strong> {formatStringAsDate(employee?.dateOfBirth)}</Typography>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose}
          severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="HR Details" detailType={DETAIL_TYPE_ENUM.HR_DETAILS}
          employeeId={employee?.id}
          detailId={EmployeeHrDetails?.id} />
        {EmployeeHrDetails &&
          <Grid container spacing={2} key={EmployeeHrDetails?.id}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Date of Joining:</strong> {EmployeeHrDetails?.dateOfJoining ? dayjs(EmployeeHrDetails.dateOfJoining).format('YYYY-MM-DD') : ''}</Typography>
              <Typography><strong>Salary:</strong> ${EmployeeHrDetails?.salary ? Number(EmployeeHrDetails.salary).toFixed(2) : ''}</Typography>
              <Typography><strong>Bonus:</strong> ${EmployeeHrDetails?.bonus ? Number(EmployeeHrDetails.bonus).toFixed(2) : ''}</Typography>
              {isForeigner(employee.employee) &&
                (<Typography><strong>Pass Type:</strong> {EmployeeHrDetails?.passType}</Typography>)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Passport Number:</strong> {EmployeeHrDetails?.passportNumber}</Typography>
              <Typography><strong>Client:</strong>
                {EmployeeHrDetails?.EmployeeHrDetailsClients?.length > 0 ? EmployeeHrDetails?.EmployeeHrDetailsClients?.map(ehdc => ehdc?.Client?.companyName)?.join(",") : "'N/A'"}
              </Typography>
              {isForeigner(employee.employee) &&
                <Typography><strong>Pass Expiry Date:</strong> {EmployeeHrDetails?.passExpiryDate ? formatStringAsDate(EmployeeHrDetails?.passExpiryDate) : 'N/A'}</Typography>
              }
            </Grid>
          </Grid>
        }
      </Paper>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Bank Details"
          detailType={DETAIL_TYPE_ENUM.BANK_DETAILS}
          employeeId={employee?.id}
          detailId={EmployeeBankDetails?.id || 0} />
        <Typography><strong>Bank Name:</strong> {EmployeeBankDetails?.bankName}</Typography>
        <Typography><strong>Account Holder:</strong> {EmployeeBankDetails?.employeeBankingName}</Typography>
        <Typography><strong>Account Number:</strong> {EmployeeBankDetails?.accountNumber}</Typography>
        <Typography><strong>Account Type:</strong> {EmployeeBankDetails?.accountType}</Typography>
      </Paper>

      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Emergency Contacts"
          detailType={DETAIL_TYPE_ENUM.EMERGENCY_CONTACTS}
          employeeId={employee?.id}
          detailId={0}
        />
        {EmployeeEmergencyContact?.map((entry: EmployeeEmergencyContact) => (
          <Box key={entry?.id} mb={2}>
            <Typography><strong>Name:</strong> {entry?.personName}</Typography>
            <Typography><strong>Relationship:</strong> {entry?.relationship}</Typography>
            <Typography><strong>Mobile:</strong> {entry?.mobile}</Typography>
            <Typography><strong>Address:</strong> {entry?.address}</Typography>
          </Box>
        ))}
      </Paper>



      <Paper elevation={3} className="p-6 mb-6">
        <SectionHeader title="Leave Balances"
          detailType={DETAIL_TYPE_ENUM.LEAVE_BALANCES}
          employeeId={employee?.id}
          detailId={0} />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Leave Type</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {EmployeeLeaveBalance?.map((entry: EmployeeLeaveBalance) => (
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
        <SectionHeader title="Work History"
          detailType={DETAIL_TYPE_ENUM.WORK_HISTORY}
          employeeId={employee?.id}
          detailId={0} />
        {EmployeeWorkHistory?.map((entry: EmployeeWorkHistory) => (
          <Box key={entry?.id} mb={2}>
            <Typography variant="subtitle1">{entry?.jobTitle}</Typography>
            <Typography><strong>Period:</strong> {formatStringAsDate(entry?.startDate)} - {entry?.endDate ? formatStringAsDate(entry?.endDate) : 'Present'}</Typography>
            <Typography><strong>Department:</strong> {entry?.department || 'N/A'}</Typography>
            <Typography><strong>Responsibilities:</strong> {entry?.responsibilities || 'N/A'}</Typography>
            <Typography><strong>Technologies:</strong> {entry?.technologiesUsed || 'N/A'}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  )
}