'use client'

import React from 'react'
import { Container, Paper } from '@mui/material'
import { z } from 'zod'
import BankDetailsForm from '../BankDetailsForm'

const bankDetailsSchema = z.object({
  employee_id: z.number().int().positive(),
  bank_name: z.string().min(1, 'Bank name is required'),
  employee_banking_name: z.string().min(1, 'Employee banking name is required'),
  account_number: z.string().min(1, 'Account number is required'),
  account_type: z.enum(['Current', 'Savings']),
})

type BankDetailsFormData = z.infer<typeof bankDetailsSchema>

export default function AddBankDetails() {
  const handleSubmit = async (data: BankDetailsFormData) => {
    // Here you would typically send a POST request to your API
    console.log('Submitting new bank details:', data)
    // Implement your API call here
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <BankDetailsForm onSubmit={handleSubmit} isEditing={false} />
      </Paper>
    </Container>
  )
}