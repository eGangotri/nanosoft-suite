'use client'

import React, { useEffect, useState } from 'react'
import { Container, Paper, CircularProgress, LinearProgress, Snackbar, Alert } from '@mui/material'
import { z } from 'zod'
import BankDetailsForm from '../../BankDetailsForm'
import { useRouter } from 'next/navigation'
import { AddEditBankDetailsFormProps, BankDetailsFormData } from '../../schema'




export default function EditBankDetails({ employeeId, initialData }: AddEditBankDetailsFormProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (data: BankDetailsFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/employee/details/bank-details/${data.employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      setIsLoading(false);

      if (!response.ok) {
        throw new Error('Failed to add bank details')
      }

      setSnackbarMessage('Bank details added successfully')
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
      {isLoading && <CircularProgress />}
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <BankDetailsForm initialData={initialData}
          onSubmit={handleSubmit}
          isEditing={true}
          employeeId={employeeId} />
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