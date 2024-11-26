'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
  Select,
  CircularProgress,
  InputLabel,
  Autocomplete
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EmployeeFormData, EmployeeFormProps, employeeSchema } from './constants'
import dayjs from 'dayjs';
import { CITIZEN_CATEGORIES, MARITAL_CATEGORIES, NATIONALITIES } from '@/utils/FormConsts'
import { initCaps } from './EmployeeUtils'

const today = dayjs();

export default function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [isEditMode] = useState<boolean>(!!initialData)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData || {
      firstName: '',
      middleName: '',
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


  const [showExpiryDate, setShowExpiryDate] = useState(initialData?.citizenshipStatus === "FOREIGNER" || false);

  const citizenshipStatus = watch('citizenshipStatus');

  React.useEffect(() => {
    setShowExpiryDate(citizenshipStatus === "FOREIGNER");
  }, [citizenshipStatus]);

  const onSubmitForm = async (data: EmployeeFormData): Promise<void> => {
    try {
      setIsLoading(true);
      console.log(`Submitting employee data: ${JSON.stringify(data.expiryDate)}`)
      await onSubmit(data)
      setIsLoading(false);
      setSnackbar({ open: true, message: 'Employee data submitted successfully!', severity: 'success' })
      if (!isEditMode) {
        reset()
      }
    } catch (error) {
      setIsLoading(false);
      setSnackbar({ open: true, message: 'Error submitting employee data. Please try again.', severity: 'error' })
      console.error('onSubmitForm:Error submitting form:', error)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <Typography variant="h5" className="mb-6 text-center">
          {/* {isEditMode ? 'Edit Employee' : 'Add New Employee'} */}
        </Typography>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

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
              name="middleName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Middle Name"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error ? error.message : null}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error}>
                  <FormLabel>Marital Status</FormLabel>
                  <Select {...field}>
                    {MARITAL_CATEGORIES.map((status: string) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              )}
            />

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                  onChange={(newValue) => field.onChange(newValue?.toISOString() || null)} // Convert dayjs back to ISO string
                  maxDate={today} // Use dayjs for the maxDate
                  label="Date of Birth"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="nationality"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error} sx={{ mt: 2, mb: 1 }}>
                  <Autocomplete
                    {...field}
                    options={NATIONALITIES}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nationality"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                  />
                </FormControl>
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
                  {CITIZEN_CATEGORIES.map((status: string) => (
                    <FormControlLabel value={status} control={<Radio />} label={status==="PR"?status:initCaps(status)} />
                  ))}
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

            {showExpiryDate && <Controller
              name="expiryDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => field.onChange(newValue?.toISOString() || null)}
                  minDate={today}
                  label="Expiry Date"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />}
          </div>

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-6"
            >
              {isLoading ? <CircularProgress size={24} /> : isEditMode ?
                'Update Employee' : 'Add Employee'}
            </Button>
          </div>
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