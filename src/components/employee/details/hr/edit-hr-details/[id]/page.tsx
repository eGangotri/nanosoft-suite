'use client'

import React, { useEffect, useState } from 'react'
import { Container, Paper, CircularProgress, Snackbar, Alert } from '@mui/material'
import { useRouter } from 'next/navigation'
import { AddEditHrDetailFormProps, EmployeeHrDetailsFormData } from '../../constants'
import HrDetailsForm from '../../hrDetailsForm'
import { editHrDetails } from '@/services/employeeService'

export default function EditHrDetails({ employee, initialData,clients }: AddEditHrDetailFormProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (data: EmployeeHrDetailsFormData) => {
    try {
      setIsLoading(true);
      await editHrDetails(employee.id, data);
      setSnackbarMessage('Hr details added successfully')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)

      // Redirect to the Hr details list page after a short delay
      setTimeout(() => {
        router.push(`/employee/employee/view-employee/${employee.id}`)
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
    <Container component="main">
      {isLoading && <CircularProgress />}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <HrDetailsForm initialData={initialData}
          onSubmit={handleSubmit}
          clients={clients}
          isEditing={true}
          employee={employee}
          />
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