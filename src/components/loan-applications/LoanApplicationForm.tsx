'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useRouter } from 'next/navigation'
import { LoanApplicationFormData, loanApplicationSchema } from './LoanApplicationSchema'

export default function LoanApplicationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { control, handleSubmit, formState: { errors } } = useForm<LoanApplicationFormData>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: { amount: 0, reason: '', month: new Date().getMonth() + 1, year: new Date().getFullYear() },
  })

  const onSubmit = async (data: LoanApplicationFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/loan-applications', {
        method: 'POST',
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
      // You might want to add some error handling here, e.g., showing an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Loan Amount"
                type="number"
                error={!!errors.amount}
                helperText={errors.amount?.message}
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              />
            )}
          />
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reason for Loan"
                multiline
                rows={4}
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Loan Month"
                views={['month', 'year']}
                openTo="month"
                value={new Date(field.value ? field.value : Date.now())}
                onChange={(newValue) => {
                  if (newValue) {
                    field.onChange(newValue.getMonth() + 1)
                    field.onChange(newValue.getFullYear())
                  }
                }}
                renderInput={(params) => <TextField {...params} error={!!errors.month} helperText={errors.month?.message} />}
              />
            )}
          />
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  )
}

