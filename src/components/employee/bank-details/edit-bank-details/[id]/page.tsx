'use client'

import React, { useEffect, useState } from 'react'
import { Container, Paper, CircularProgress, LinearProgress } from '@mui/material'
import { z } from 'zod'
import { useParams } from 'next/navigation'
import BankDetailsForm from '../../BankDetailsForm'

const bankDetailsSchema = z.object({
  employee_id: z.number().int().positive(),
  bank_name: z.string().min(1, 'Bank name is required'),
  employee_banking_name: z.string().min(1, 'Employee banking name is required'),
  account_number: z.string().min(1, 'Account number is required'),
  account_type: z.enum(['Current', 'Savings']),
})

type BankDetailsFormData = z.infer<typeof bankDetailsSchema>

interface EditBankDetailsFormProps {
  employeeId: number
  initialData: BankDetailsFormData
}

export default function EditBankDetails({ employeeId, initialData }: EditBankDetailsFormProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: BankDetailsFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/employee/details/bank-details', {
        method: 'PATCH',
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
        // router.push(`/employee/view-employee/${employeeId}`)
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

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <BankDetailsForm initialData={initialData}
          onSubmit={handleSubmit}
          isEditing={true}
          employeeId={employeeId} />
      </Paper>
    </Container>
  )
}