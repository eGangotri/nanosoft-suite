'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel,
  FormHelperText 
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { parseISO } from 'date-fns'

// Define citizenship type
type CitizenshipStatus = 'citizen' | 'pr' | 'foreigner'

// Define the schema for form validation
const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation is required'),
  dateOfBirth: z.date().refine((date) => {
    return date <= new Date() && date >= new Date(1900, 0, 1)
  }, 'Invalid date of birth'),
  nationality: z.string().min(2, 'Nationality is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number'),
  citizenshipStatus: z.enum(['citizen', 'pr', 'foreigner']),
  nricOrFinNo: z.string().optional(),
  expiryDate: z.date().optional(),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

interface EmployeeFormProps {
  initialData?: EmployeeFormData
  onSubmit: (data: EmployeeFormData) => void
}

export default function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps): React.ReactElement {
  const [isEditMode] = useState<boolean>(!!initialData)
  const [citizenshipStatus, setCitizenshipStatus] = useState<CitizenshipStatus>(
    initialData?.citizenshipStatus || 'citizen'
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      designation: '',
      dateOfBirth: new Date(),
      nationality: '',
      email: '',
      mobile: '',
      citizenshipStatus: 'citizen',
      nricOrFinNo: '',
      expiryDate: undefined,
    },
  })

  const onSubmitForm = (data: EmployeeFormData): void => {
    onSubmit(data)
    if (!isEditMode) {
      reset()
    }
  }

  const handleCitizenshipChange = (value: CitizenshipStatus) => {
    setCitizenshipStatus(value)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <Typography variant="h5" className="mb-6 text-center">
          {isEditMode ? 'Edit Employee' : 'Add New Employee'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller<EmployeeFormData>
              name="firstName"
              control={control}
              render={({ field, fieldState: { error } }): React.ReactElement => (
                <TextField
                  {...field}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller<EmployeeFormData>
              name="lastName"
              control={control}
              render={({ field, fieldState: { error } }): React.ReactElement => (
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>

          <Controller<EmployeeFormData>
            name="designation"
            control={control}
            render={({ field, fieldState: { error } }): React.ReactElement => (
              <TextField
                {...field}
                label="Designation"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller<EmployeeFormData>
              name="dateOfBirth"
              control={control}
              render={({ field, fieldState: { error } }): React.ReactElement => (
                <DatePicker
                  {...field}
                  label="Date of Birth"
                  renderInput={(params): React.ReactElement => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
            <Controller<EmployeeFormData>
              name="nationality"
              control={control}
              render={({ field, fieldState: { error } }): React.ReactElement => (
                <TextField
                  {...field}
                  label="Nationality"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller<EmployeeFormData>
              name="email"
              control={control}
              render={({ field, fieldState: { error } }): React.ReactElement => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller<EmployeeFormData>
              name="mobile"
              control={control}
              render={({ field, fieldState: { error } }): React.ReactElement => (
                <TextField
                  {...field}
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>

          <Controller<EmployeeFormData>
            name="citizenshipStatus"
            control={control}
            render={({ field, fieldState: { error } }): React.ReactElement => (
              <FormControl error={!!error} component="fieldset">
                <FormLabel component="legend">Citizenship Status</FormLabel>
                <RadioGroup
                  {...field}
                  row
                  onChange={(e) => {
                    field.onChange(e)
                    handleCitizenshipChange(e.target.value as CitizenshipStatus)
                  }}
                >
                  <FormControlLabel value="citizen" control={<Radio />} label="Citizen" />
                  <FormControlLabel value="pr" control={<Radio />} label="PR" />
                  <FormControlLabel value="foreigner" control={<Radio />} label="Foreigner" />
                </RadioGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {(citizenshipStatus === 'citizen' || citizenshipStatus === 'pr') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller<EmployeeFormData>
                name="nricOrFinNo"
                control={control}
                render={({ field, fieldState: { error } }): React.ReactElement => (
                  <TextField
                    {...field}
                    label="NRIC"
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller<EmployeeFormData>
                name="expiryDate"
                control={control}
                render={({ field, fieldState: { error } }): React.ReactElement => (
                  <DatePicker
                    {...field}
                    label="Expiry Date"
                    renderInput={(params): React.ReactElement => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </div>
          )}

          {citizenshipStatus === 'foreigner' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller<EmployeeFormData>
                name="nricOrFinNo"
                control={control}
                render={({ field, fieldState: { error } }): React.ReactElement => (
                  <TextField
                    {...field}
                    label="FIN Number"
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller<EmployeeFormData>
                name="expiryDate"
                control={control}
                render={({ field, fieldState: { error } }): React.ReactElement => (
                  <DatePicker
                    {...field}
                    label="Pass Expiry Date"
                    renderInput={(params): React.ReactElement => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            </div>
          )}

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            className="mt-6"
          >
            {isEditMode ? 'Update Employee' : 'Add Employee'}
          </Button>
        </form>
      </Box>
    </LocalizationProvider>
  )
}