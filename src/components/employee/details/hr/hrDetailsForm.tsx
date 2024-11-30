'use client'

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, FormHelperText, CircularProgress, ListItemText, OutlinedInput, Checkbox } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { EmployeeHrDetailsFormData, employeeHrDetailsSchema, HrDetailsFormProps } from './constants';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatedEmployeeName } from '../../EmployeeUtils';
import {
  CITIZEN_CATEGORIES,
  isMalaysianForeigner,
  isWepMandatory
  , VALID_PASS_TYPES_VALUES
} from '@/utils/FormConsts';
import { useRouter } from 'next/navigation'

const today = dayjs();

const HrDetailsForm: React.FC<HrDetailsFormProps> = ({
  initialData,
  onSubmit,
  allClients,
  isEditing,
  employee,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EmployeeHrDetailsFormData>({
    resolver: zodResolver(employeeHrDetailsSchema),
    defaultValues: initialData
  });
  const allErrors = Object.values(errors).map(error => JSON.stringify(error)).filter(Boolean);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const formValues = watch();
  console.log('Form Values:', formValues);
  console.log('Form Errors:', errors);

  const [showWorkPermitNoField, setShowWorkPermitNoField] = useState(isWepMandatory(initialData?.passType));
  const nonPRMalaysian = isMalaysianForeigner(employee);

  const passTypeWatch = watch('passType');

  React.useEffect(() => {
    console.log('WP Number:', passTypeWatch, isWepMandatory(passTypeWatch));
    setShowWorkPermitNoField(isWepMandatory(passTypeWatch));
    console.log('showworkpermitNumberField:', showWorkPermitNoField);

  }, [passTypeWatch]);

  React.useEffect(() => {
    console.log('WP Number:', passTypeWatch, isWepMandatory(passTypeWatch));
    setShowWorkPermitNoField(isWepMandatory(passTypeWatch));
    console.log('showworkpermitNumberField:', showWorkPermitNoField);

  }, [passTypeWatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        {allErrors.length > 0 && (
          <Box>
            <Typography variant="h6" color="error">Errors:</Typography>
            <ul>
              {allErrors.map((error, index) => (
                <li key={index}>:{error}</li>
              ))}
            </ul>
          </Box>
        )}
        <Typography variant="h6" gutterBottom className='pb-2'>
          {isEditing ? 'Edit HR Details' : 'Add HR Details'} for {formatedEmployeeName(employee)} ({employee.citizenshipStatus})
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{ }
            <Controller
              name="dateOfJoining"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                  onChange={(newValue) => field.onChange(newValue?.toISOString() || null)} // Convert dayjs back to ISO string
                  maxDate={today} // Use dayjs for the maxDate
                  label="Date of Joining"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="salary"
                  label="Salary"
                  type="number"
                  error={!!errors.salary}
                  helperText={errors.salary?.message}
                />
              )}
            />
            <Controller
              name="bonus"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="bonus"
                  label="Bonus"
                  type="number"
                  error={!!errors.bonus}
                  helperText={errors.bonus?.message}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="passportNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  id="passportNumber"
                  label="Passport Number"
                  error={!!errors.passportNumber}
                  helperText={errors.passportNumber?.message}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())} // Convert input to uppercase
                />
              )}
            />
            <Controller
              name="passportIssueDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                  onChange={(newValue) => field.onChange(newValue?.toISOString() || null)} // Convert dayjs back to ISO string
                  maxDate={today} // Use dayjs for the maxDate
                  label="Passport Issue Date"
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
              name="passportExpiryDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                  onChange={(newValue) => field.onChange(newValue?.toISOString() || null)} // Convert dayjs back to ISO string
                  minDate={today} // Use dayjs for the maxDate
                  label="Passport Expiry Date"
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
          {employee.citizenshipStatus === CITIZEN_CATEGORIES.Foreigner &&
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="passType"
                  control={control}
                  rules={{ required: 'Pass Type is required for Foreigners' }}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth margin="normal" error={!!error}>
                      <InputLabel id="pass-type-label">Pass Type</InputLabel>
                      <Select
                        {...field}
                        labelId="pass-type-label"
                        id="passType"
                        label="Pass Type"
                      >
                        {VALID_PASS_TYPES_VALUES.map((_passType: string) => {
                          return (
                            <MenuItem key={_passType} value={_passType}>
                              {_passType}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {error && <FormHelperText>{error.message}</FormHelperText>}
                    </FormControl>
                  )}
                />

                <Controller
                  name="passExpiryDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                      onChange={(newValue) => field.onChange(newValue?.toISOString() || null)} // Convert dayjs back to ISO string
                      minDate={today} // Use dayjs for the maxDate
                      label="Pass Expiry Date"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Controller
                  name="renewalApplyDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                      onChange={(newValue) => field.onChange(newValue?.toISOString() || null)} // Convert dayjs back to ISO string
                      minDate={today} // Use dayjs for the maxDate
                      label="Renewal Apply Date"
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
                  name="newApplyDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                      onChange={(newValue) => field.onChange(newValue?.toISOString() || null)} // Convert dayjs back to ISO string
                      minDate={today} // Use dayjs for the maxDate
                      label="New Apply Date"
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
                  name="passCancelledDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                      onChange={(newValue) => field.onChange(newValue ? newValue.toISOString() : null)} // Convert dayjs back to ISO string or set to null

                      minDate={today} // Use dayjs for the maxDate
                      label="Pass Cancelled Date"
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
            </>}
          {(employee.citizenshipStatus === CITIZEN_CATEGORIES.Foreigner && showWorkPermitNoField) &&
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="workpermitNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="workpermitNumber"
                      label="Work Permit Number"
                      error={!!errors.workpermitNumber}
                      helperText={errors.workpermitNumber?.message}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())} // Convert input to uppercase
                    />
                  )}
                />
              </div>
            </>}
          {nonPRMalaysian &&
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="malaysiaIC"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="malaysiaIC"
                      label="Malaysia IC"
                      error={!!errors.malaysiaIC}
                      helperText={errors.malaysiaIC?.message}
                      onChange={(e) => field.onChange(e.target.value.toUpperCase())} // Convert input to uppercase
                    />
                  )}
                />
              </div>
            </>}
          <Controller
            name="clientIds"
            control={control}
            defaultValue={[]}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth margin="normal" error={!!error}>
                <InputLabel id="clients-label">Clients</InputLabel>
                <Select
                  {...field}
                  labelId="clients-label"
                  id="clientIds"
                  multiple
                  input={<OutlinedInput label="Clients" />}
                  renderValue={(selected: number[]) => {
                    const selectedClients = allClients?.filter(client => selected.includes(client.id)) || [];
                    return selectedClients?.map(client => client.companyName).join(', ');
                  }}
                >
                  {allClients?.map((client: Client) => (
                    <MenuItem key={client.id} value={client.id}>
                      <Checkbox checked={field?.value?.includes(client.id)} />
                      <ListItemText primary={client.companyName} />
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            name="remarks"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                id="remarks"
                label="Remarks"
                multiline
                rows={4}
                error={!!errors.remarks}
                helperText={errors.remarks?.message}
              />
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button type="submit" fullWidth variant="contained" className="mr-2 pr-2">
              {isLoading ? <CircularProgress size={24} /> : (isEditing ? 'Update Hr Details' : 'Add Hr Details')}

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
              onClick={() => router.push(`/employee/employee/view-employee/${employee.id}`)}>
              Cancel
            </Button>
          </div>
        </form>
      </Box >
    </LocalizationProvider >
  );
};

export default HrDetailsForm;

