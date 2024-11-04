'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { TextField, Button, Box, Typography, Switch, FormControlLabel } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { parseISO } from 'date-fns'

// Define the schema for form validation
const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.date().refine((date) => {
    return date <= new Date() && date >= new Date(1900, 0, 1)
  }, 'Invalid date of birth'),
  department: z.string().min(2, 'Department must be at least 2 characters'),
  isActive: z.boolean(),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

interface EmployeeFormProps {
  initialData?: EmployeeFormData
  onSubmit: (data: EmployeeFormData) => void
}

export default function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps) {
  const [isEditMode] = useState(!!initialData)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          dateOfBirth: parseISO(initialData.dateOfBirth as unknown as string), // Parse the date string
        }
      : {
          firstName: '',
          lastName: '',
          email: '',
          dateOfBirth: new Date(),
          department: '',
          isActive: true,
        },
  })

  const onSubmitForm = (data: EmployeeFormData) => {
    onSubmit(data)
    if (!isEditMode) {
      reset()
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <Typography variant="h5" className="mb-4 text-center">
          {isEditMode ? 'Edit Employee' : 'Add New Employee'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
                <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Date of Birth"
                renderInput={(params: TextFieldProps) => (
                    <TextField
                    {...params}
                    fullWidth
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Department"
                variant="outlined"
                fullWidth
                error={!!errors.department}
                helperText={errors.department?.message}
              />
            )}
          />
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={field.value} />}
                label="Active Employee"
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isEditMode ? 'Update Employee' : 'Add Employee'}
          </Button>
        </form>
      </Box>
    </LocalizationProvider>
  )
}