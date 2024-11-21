'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material'
import { BankDetailsFormData, bankDetailsSchema } from './constants'
import { EmployeeFormData } from '../employee-form'


interface BankDetailsFormProps {
  employeeId: number
  initialData?: BankDetailsFormData
  onSubmit: (data: BankDetailsFormData) => void
  isEditing: boolean,
}

export default function BankDetailsForm({ initialData, onSubmit, isEditing, employeeId }: BankDetailsFormProps) {
  const [employeeName, setEmployeeName] = useState('')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: initialData || {
      employee_id: employeeId,
      bank_name: '',
      employee_banking_name: '',
      account_number: '',
      account_type: 'Savings',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/employee/list?id=${employeeId}`);
      const data:EmployeeFormData = await response.json()
      console.log('Employee data:', JSON.stringify(data))
      setEmployeeName(`${data.firstName} ${data.middleName} ${data.lastName}`)
      setValue('employee_id', employeeId);
      console.log('Fetching employee data for ID:', employeeId)
      console.log('Fetching employee data for ID:', JSON.stringify(data))
    }
    fetchData()
  }, [employeeId])

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Bank Details' : 'Add Bank Details'} for {employeeName}
      </Typography>
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