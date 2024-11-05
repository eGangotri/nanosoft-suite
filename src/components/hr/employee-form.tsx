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
  FormHelperText,
  Snackbar,
  Alert,
  MenuItem,
  Select
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

type CitizenshipStatus = 'citizen' | 'pr' | 'foreigner'
type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Defacto' | 'Separated'

const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation must be at least 2 characters'),
  dateOfBirth: z.date().refine((date) => {
    return date <= new Date() && date >= new Date(1900, 0, 1)
  }, 'Invalid date of birth'),
  nationality: z.string().min(2, 'Nationality must be at least 2 characters'),
  email: z.string().email('Invalid email address').regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email format'),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number'),
  citizenshipStatus: z.enum(['citizen', 'pr', 'foreigner']),
  nricOrFinNo: z.string().regex(/^[STFGM]\d{7}[A-Za-z]$/, 'Invalid NRIC/FIN format'),
  expiryDate: z.date().optional(),
  maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Defacto', 'Separated']),
  addressLine1: z.string().min(1, 'Address Line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().regex(/^\d{5,9}$/, 'Invalid postal code'),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

interface EmployeeFormProps {
  initialData?: EmployeeFormData
  onSubmit: (data: EmployeeFormData) => Promise<void>
}

export default function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps): React.ReactElement {
  const [isEditMode] = useState<boolean>(!!initialData)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })

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
      maritalStatus: 'Single',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      postalCode: '',
    },
  })

  const onSubmitForm = async (data: EmployeeFormData): Promise<void> => {
    try {
      await onSubmit(data)
      setSnackbar({ open: true, message: 'Employee data submitted successfully!', severity: 'success' })
      if (!isEditMode) {
        reset()
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Error submitting employee data. Please try again.', severity: 'error' })
      console.error('onSubmitForm:Error submitting form:', error)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <Typography variant="h5" className="mb-6 text-center">
          {isEditMode ? 'Edit Employee' : 'Add New Employee'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState: { error } }) => (
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
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState: { error } }) => (
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

          <Controller
            name="designation"
            control={control}
            render={({ field, fieldState: { error } }) => (
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
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  label="Date of Birth"
                  renderInput={(params) => (
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
            <Controller
              name="nationality"
              control={control}
              render={({ field, fieldState: { error } }) => (
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
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
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
            <Controller
              name="mobile"
              control={control}
              render={({ field, fieldState: { error } }) => (
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

          <Controller
            name="citizenshipStatus"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl error={!!error} component="fieldset">
                <FormLabel component="legend">Citizenship Status</FormLabel>
                <RadioGroup {...field} row>
                  <FormControlLabel value="citizen" control={<Radio />} label="Citizen" />
                  <FormControlLabel value="pr" control={<Radio />} label="PR" />
                  <FormControlLabel value="foreigner" control={<Radio />} label="Foreigner" />
                </RadioGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="nricOrFinNo"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="NRIC/FIN Number"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message || 'Format: S1234567A'}
                />
              )}
            />
            <Controller
              name="expiryDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  label="Expiry Date"
                  renderInput={(params) => (
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

          <Controller
            name="maritalStatus"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <FormLabel>Marital Status</FormLabel>
                <Select {...field}>
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Defacto">Defacto</MenuItem>
                  <MenuItem value="Separated">Separated</MenuItem>
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />

          <Controller
            name="addressLine1"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Address Line 1"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="addressLine2"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Address Line 2"
                variant="outlined"
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="City"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Country"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller
              name="postalCode"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </div>

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
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  )
}