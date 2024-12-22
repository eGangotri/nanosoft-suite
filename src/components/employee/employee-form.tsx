'use client'

import React, { useEffect, useState } from 'react'
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
  Card,
  CardContent,
  Divider,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EmployeeFormData, EmployeeFormProps, employeeSchema } from './constants'
import dayjs from 'dayjs';
import { CITIZEN_CATEGORIES, CITIZEN_CATEGORIES_VALUES, GENDER_TYPE_VALUES, MARITAL_CATEGORIES_VALUES, NATIONALITY_VALUES, RACE_TYPE_VALUES } from '@/utils/FormConsts'
import { useRouter } from 'next/navigation'
import { lookupPostalCodeSG } from '@/utils/utils';

const today = dayjs();

export default function EmployeeForm({ initialData, onSubmit }: EmployeeFormProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [isEditMode] = useState<boolean>(!!initialData)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  })
  const router = useRouter();
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
    defaultValues: initialData
  })


  const [showExpiryDate, setShowExpiryDate] = useState(initialData?.citizenshipStatus === CITIZEN_CATEGORIES.Foreigner || false);
  const [showForeignAddress, setShowForeignAddress] = useState((initialData?.citizenshipStatus && (initialData?.citizenshipStatus === CITIZEN_CATEGORIES.PR || initialData?.citizenshipStatus === CITIZEN_CATEGORIES.Foreigner)) || false);
  const citizenshipStatus = watch('citizenshipStatus');

  const [lookupAddress, setLookupAddress] = useState({
    blkNo: "",
    roadName: "",
    building: ""
  });

  const localPostalCode = watch('localPostalCode');

  useEffect(() => {
    if (lookupAddress.blkNo) {
      setValue('localAddressLine1', lookupAddress.blkNo);
      setValue('localAddressLine2', lookupAddress.building);
      setValue('localAddressLine3', lookupAddress.roadName);
    }
  }, [lookupAddress, setValue]);

  const handlePostalCodeLookup = async () => {
    if (localPostalCode) {
      const lookupAdd = await lookupPostalCodeSG(localPostalCode);
      setLookupAddress(lookupAdd);
    }
  };

  React.useEffect(() => {
    setShowExpiryDate(citizenshipStatus === CITIZEN_CATEGORIES.Foreigner)
    setShowForeignAddress((initialData?.citizenshipStatus && (initialData?.citizenshipStatus === CITIZEN_CATEGORIES.PR || initialData?.citizenshipStatus === CITIZEN_CATEGORIES.Foreigner)) || false);

  }, [citizenshipStatus]);

  const onSubmitForm = async (data: EmployeeFormData): Promise<void> => {
    try {
      console.log("------", JSON.stringify(data));
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

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Controller
              name="maritalStatus"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error}>
                  <FormLabel>Marital Status</FormLabel>
                  <Select {...field}>
                    {MARITAL_CATEGORIES_VALUES.map((status: string) => (
                      <MenuItem key={status} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="nationality"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error} sx={{ mt: 2, mb: 1 }}>
                  <Autocomplete
                    {...field}
                    options={NATIONALITY_VALUES}
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
                  {CITIZEN_CATEGORIES_VALUES.map((status: string) => (
                    <FormControlLabel value={status} control={<Radio />} label={status} />
                  ))}
                </RadioGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="race"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error} component="fieldset">
                  <FormLabel component="legend">Race</FormLabel>
                  <RadioGroup {...field} row>
                    {RACE_TYPE_VALUES.map((status: string) => (
                      <FormControlLabel value={status} control={<Radio />} label={status} />
                    ))}
                  </RadioGroup>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              )}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error} component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup {...field} row>
                    {GENDER_TYPE_VALUES.map((status: string) => (
                      <FormControlLabel value={status} control={<Radio />} label={status} />
                    ))}
                  </RadioGroup>
                  {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </div>
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

          <Card className="mt-6">
            <CardContent>
              <Typography variant="h6" className="mb-4">Address Information</Typography>
              <Divider className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className='flex flex-col gap-3'>
                  <Typography variant="subtitle1" className="mb-4">Local Address</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    <Controller
                      name="localAddressLine1"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          label={"Block No." + JSON.stringify(lookupAddress)}
                          variant="outlined"
                          className="w-28"
                          disabled
                          error={!!error}
                          helperText={error?.message}
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="localAddressLine2"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          label="Building Name"
                          variant="outlined"
                          fullWidth
                          disabled
                          error={!!error}
                          helperText={error?.message}
                          slotProps={{
                            inputLabel: {
                              shrink: true,
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                  <Controller
                    name="localAddressLine3"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Road Name"
                        variant="outlined"
                        fullWidth
                        disabled
                        error={!!error}
                        helperText={error?.message}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="levelOrUnitNo"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Level/Unit No."
                        variant="outlined"
                        className='w-28'
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />

                  <Controller
                    name="localPostalCode"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Postal Code"
                        variant="outlined"
                        className='w-28'
                        error={!!error}
                        helperText={error?.message}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                          input: {
                            endAdornment: (
                              <SearchIcon
                                color="action"
                                className="mr-1 cursor-pointer hover:text-primary-main"
                                onClick={handlePostalCodeLookup}
                                onKeyDown={(e) => e.key === 'Enter' && handlePostalCodeLookup()}
                              />
                            ),
                          },
                        }}
                      />
                    )}
                  />
                </div>
                {showForeignAddress && (
                  <div className='flex flex-col gap-3'>
                    <Typography variant="subtitle1" className="mb-4">Foreign Address</Typography>
                    <Controller
                      name="foreignAddressLine1"
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
                      name="foreignAddressLine2"
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
                    <div className="grid grid-cols-2 gap-3">
                      <Controller
                        name="foreignAddressCity"
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
                        name="foreignAddressState"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            label="State"
                            variant="outlined"
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="foreignAddressCountry"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <FormControl fullWidth error={!!error} sx={{ mt: 2, mb: 1 }}>
                            <Autocomplete
                              {...field}
                              options={NATIONALITY_VALUES}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Country"
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
                    <Controller
                      name="foreignAddressPostalCode"
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
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mr-2 pr-2"
            >
              {isLoading ? <CircularProgress size={24} /> : isEditMode ?
                'Update Employee' : 'Add Employee'} {isLoading}
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
              onClick={() => router.push(`/employee/employee/`)}>
              Cancel
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