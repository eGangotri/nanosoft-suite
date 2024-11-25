'use client'

import React, { useState } from 'react'
import { Alert, Container, LinearProgress, Paper, Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import { HrDetailsFormData } from '../constants'
import HrDetailsForm from '../hrDetailsForm'


interface AddEditHrDetailFormProps {
  employeeId: number
  initialData: EmployeeHrDetails
}

export default function AddHrDetails({ employeeId, initialData }: AddEditHrDetailFormProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (data: HrDetailsFormData) => {
    try {
      setIsLoading(true);


      setSnackbarMessage('Hr details added successfully')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)

      // Redirect to the bank details list page after a short delay
      setTimeout(() => {
        router.push(`/employee/employee/view-employee/${employeeId}`)
      }, 2000)
    } catch (error) {
      console.error('Error adding bank details:', error)
      setSnackbarMessage('Failed to add bank details. Please try again.')
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