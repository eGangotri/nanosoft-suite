'use client'

import React, { useEffect, useState } from 'react'
import { Container, Paper, CircularProgress } from '@mui/material'
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

export default function EditBankDetails() {
  const [bankDetails, setBankDetails] = useState<BankDetailsFormData | null>(null)
  const params = useParams()
  const id = params.id as string
  useEffect(() => {
    const fetchBankDetails = async () => {
      console.log('Fetching data for ID:', id)
      const response = await fetch(`/api/employee/details/bank-details/${id}/?id=${id}`)
      const data = await response.json()
      console.log('fetchBankDetails:Employee det: data:', JSON.stringify(data))
      setBankDetails(data)
      console.log('Fetching data for ID:', JSON.stringify(data))
    }
    fetchBankDetails()
  }, [id])

  const handleSubmit = async (data: BankDetailsFormData) => {
    // Here you would typically send a PUT request to your API
    console.log('Updating bank details:', data)
    // Implement your API call here
  }

  if (!bankDetails) {
    return (
      <Container component="main" maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <BankDetailsForm initialData={bankDetails} onSubmit={handleSubmit} isEditing={true} />
      </Paper>
    </Container>
  )
}