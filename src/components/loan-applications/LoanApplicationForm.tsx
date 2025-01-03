'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, Box, CircularProgress, Snackbar, Alert } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useRouter } from 'next/navigation'
import { LoanApplicationFormData, loanApplicationSchema } from './LoanApplicationSchema'

interface LoanApplicationFormProps {
  id?: string;
}

export default function LoanApplicationForm({ id }: LoanApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [initialData, setInitialData] = useState<LoanApplicationFormData>({ amount: 0, reason: '', month: new Date().getMonth() + 1, year: new Date().getFullYear() });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })
  const router = useRouter()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<LoanApplicationFormData>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: { amount: 0, reason: '', month: new Date().getMonth() + 1, year: new Date().getFullYear() },
  })

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }


  useEffect(() => {
    if (id) {
      fetchLoanApplication()
    }
  }, [id])

  const fetchLoanApplication = async () => {
    setIsFetching(true)
    try {
      const response = await fetch(`/api/loan-applications/${id}`)
      if (response.ok) {
        const data = await response.json()
        setInitialData(data)
        reset({
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
      // You might want to add some error handling here, e.g., showing an error message to the user
    } finally {
      setIsFetching(false)
    }
  }

  const onSubmit = async (data: LoanApplicationFormData) => {
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
        throw new Error(`Failed to ${id ? 'update' : 'submit'} loan application`)
      }
    } catch (error) {
      console.error(`Error ${id ? 'updating' : 'submitting'} loan application:`, error)
      // You might want to add some error handling here, e.g., showing an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return <CircularProgress />
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
                value={new Date(field.value, control._getWatch('year') - 1)}
                onChange={(newValue) => {
                  if (newValue) {
                    field.onChange(newValue.getMonth() + 1)
                    control.setValue('year', newValue.getFullYear())
                  }
                }}
                renderInput={(params) => <TextField {...params} error={!!errors.month} helperText={errors.month?.message} />}
              />
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mr-2 pr-2"
            >
              {isLoading ? <CircularProgress size={24} /> : (id ? 'Update' : 'Submit')}

            </Button>
            <Button type="reset"
              onClick={() => reset(initialData)} // Reset the form to initial values
              fullWidth
              variant="contained"
              className="mr-2 pr-2">
              Reset
            </Button>
            <Button type="button"
              fullWidth
              variant="contained"
              className="mr-2 pr-2"
              onClick={() => router.push(`/loans/manage/`)}>
              Cancel
            </Button>
          </div>
        </Box>
      </form>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  )
}

