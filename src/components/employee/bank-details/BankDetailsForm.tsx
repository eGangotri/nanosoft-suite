'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material'
import { BankDetailsFormData } from './constants'


interface BankDetailsFormProps {
  initialData?: BankDetailsFormData
  onSubmit: (data: BankDetailsFormData) => void
  isEditing: boolean
}

export default function BankDetailsForm({ initialData, onSubmit, isEditing }: BankDetailsFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: initialData || {
      employee_id: 0,
      bank_name: '',
      employee_banking_name: '',
      account_number: '',
      account_type: 'Savings',
    },
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Bank Details' : 'Add Bank Details'}
      </Typography>
      <Controller
        name="employee_id"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="employee_id"
            label="Employee ID"
            type="number"
            error={!!errors.employee_id}
            helperText={errors.employee_id?.message}
          />
        )}
      />
      <Controller
        name="bank_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="bank_name"
            label="Bank Name"
            error={!!errors.bank_name}
            helperText={errors.bank_name?.message}
          />
        )}
      />
      <Controller
        name="employee_banking_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="employee_banking_name"
            label="Employee Banking Name"
            error={!!errors.employee_banking_name}
            helperText={errors.employee_banking_name?.message}
          />
        )}
      />
      <Controller
        name="account_number"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="account_number"
            label="Account Number"
            error={!!errors.account_number}
            helperText={errors.account_number?.message}
          />
        )}
      />
      <Controller
        name="account_type"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
              {...field}
              labelId="account-type-label"
              id="account_type"
              label="Account Type"
              error={!!errors.account_type}
            >
              <MenuItem value="Current">Current</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {isEditing ? 'Update' : 'Add'} Bank Details
      </Button>
    </Box>
  )
}