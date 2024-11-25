'use client'

import React, { useState } from 'react'
import { Alert, Container, LinearProgress, Paper, Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import HrDetailsForm from '../hrDetailsForm'
import { addHrDetails } from '@/services/employeeService'
import { EmployeeHrDetailsFormData } from '../constants'


interface AddEditHrDetailFormProps {
  employeeId: number
  initialData: EmployeeHrDetailsFormData
}

export default function AddHrDetails({ employeeId, initialData }: AddEditHrDetailFormProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: EmployeeHrDetails) => {
    console.log('Submitting Hr details:', data)
    try {
      setIsLoading(true);
      await addHrDetails(employeeId, data);
      setSnackbarMessage('Hr details added successfully')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)

      // Redirect to the Hr details list page after a short delay
      setTimeout(() => {
        router.push(`/employee/employee/view-employee/${employeeId}`)
      }, 2000)
    } catch (error) {
      console.error('Error adding Hr details:', error)
      setSnackbarMessage('Failed to add Hr details. Please try again.')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
    finally {
      setIsLoading(false);
    }
  }
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };


  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {isLoading && <LinearProgress />}
        <HrDetailsForm onSubmit={handleSubmit}
          isEditing={false}
          employeeId={employeeId}
          initialData={initialData} />
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
    </Container>
  )
}