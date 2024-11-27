'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material'
import { EmployeeFormData } from '../employee-form'
import { BankDetailsFormData, bankDetailsSchema } from './schema'


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
      employeeId: employeeId,
      bankName: '',
      employeeBankingName: '',
      accountNumber: '',
      accountType: 'Savings',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/employee/list?id=${employeeId}`);
      const data:EmployeeFormData = await response.json()
      console.log('Employee data:', JSON.stringify(data))
      setEmployeeName(`${data.firstName} ${data.middleName} ${data.lastName}`)
      setValue('employeeId', employeeId);
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
        name="bankName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="bankName"
            label="Bank Name"
            error={!!errors.bankName}
            helperText={errors.bankName?.message}
          />
        )}
      />
      <Controller
        name="employeeBankingName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="employeeBankingName"
            label="Employee Banking Name"
            error={!!errors.employeeBankingName}
            helperText={errors.employeeBankingName?.message}
          />
        )}
      />
      <Controller
        name="accountNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="accountNumber"
            label="Account Number"
            error={!!errors.accountNumber}
            helperText={errors.accountNumber?.message}
          />
        )}
      />
      <Controller
        name="accountType"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
              {...field}
              labelId="account-type-label"
              id="accountType"
              label="Account Type"
              error={!!errors.accountType}
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