'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography, CircularProgress } from '@mui/material'
import { BankDetailsFormData, BankDetailsFormProps, bankDetailsSchema } from './schema'
import { useRouter } from 'next/navigation'
import { ACCT_TYPES_VALUES } from '@/utils/FormConsts'


export default function BankDetailsForm({ initialData, onSubmit, isLoading }: BankDetailsFormProps) {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: initialData,
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <Typography variant="h4" gutterBottom>
        {initialData && initialData?.id && initialData?.id > 0 ? 'Edit Bank Details' : 'Add Bank Details'}
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
              {ACCT_TYPES_VALUES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button type="submit" fullWidth variant="contained" className="mr-2 pr-2">
          {isLoading ? <CircularProgress size={24} /> :
            (initialData && initialData?.id && initialData?.id > 0 ? 'Update' : 'Add')}
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
          onClick={() => router.push(`/employee/employee/view-employee/${initialData?.employeeId}`)}>
          Cancel
        </Button>
      </div>
    </Box>
  )
}