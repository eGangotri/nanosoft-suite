'use client'

import React, { useState } from 'react'
import { Container, Paper } from '@mui/material'
import { z } from 'zod'
import BankDetailsForm from '../BankDetailsForm'
import { useRouter } from 'next/navigation'

const bankDetailsSchema = z.object({
  employee_id: z.number().int().positive(),
  bank_name: z.string().min(1, 'Bank name is required'),
  employee_banking_name: z.string().min(1, 'Employee banking name is required'),
  account_number: z.string().min(1, 'Account number is required'),
  account_type: z.enum(['Current', 'Savings']),
})

type BankDetailsFormData = z.infer<typeof bankDetailsSchema>

export default function AddBankDetails() {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const router = useRouter()

  const handleSubmit = async (data: BankDetailsFormData) => {
    try {
      const response = await fetch('/api/employee/details/bank-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to add bank details')
      }

      setSnackbarMessage('Bank details added successfully')
      setSnackbarSeverity('success')
      setOpenSnackbar(true)

      // Redirect to the bank details list page after a short delay
      setTimeout(() => {
        router.push('/bank-details')
      }, 2000)
    } catch (error) {
      console.error('Error adding bank details:', error)
      setSnackbarMessage('Failed to add bank details. Please try again.')
      setSnackbarSeverity('error')
      setOpenSnackbar(true)
    }
  }
  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <BankDetailsForm onSubmit={handleSubmit} isEditing={false} />
      </Paper>
    </Container>
  )
}