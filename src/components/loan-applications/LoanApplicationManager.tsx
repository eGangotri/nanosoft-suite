import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Typography, Paper, Box } from '@mui/material'
import LoanApplicationForm from './LoanApplicationForm'
import { LoanApplicationFormData } from './LoanApplicationSchema'

interface LoanApplicationManagerProps {
  id?: string
}

export default function LoanApplicationManager({ id }: LoanApplicationManagerProps) {
  const [initialData, setInitialData] = useState<LoanApplicationFormData | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (id) {
      fetchLoanApplication()
    }
  }, [id])

  const fetchLoanApplication = async () => {
    try {
      const response = await fetch(`/api/loan-applications/${id}`)
      if (response.ok) {
        const data = await response.json()
        setInitialData({ 
          amount: data.amount, 
          reason: data.reason,
          month: data.month,
          year: data.year
        })
      } else {
        throw new Error('Failed to fetch loan application')
      }
    } catch (error) {
      console.error('Error fetching loan application:', error)
    }
  }

  const handleSubmit = async (data: LoanApplicationFormData) => {
    setIsLoading(true)
    try {
      const url = id ? `/api/loan-applications/${id}` : '/api/loan-applications'
      const method = id ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        router.push('/loans/manage')
      } else {
        throw new Error('Failed to submit loan application')
      }
    } catch (error) {
      console.error('Error submitting loan application:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Loan Application' : 'Apply for a Loan'}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <LoanApplicationForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Box>
    </Paper>
  )
}

