'use client'

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { EmployeeHrDetailsFormData, employeeHrDetailsSchema } from './constants';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatedEmployeeName, initCapsForCitizenStatus } from '../../EmployeeUtils';
import { CITIZEN_CATEGORIES, VALID_PASS_TYPES } from '@/utils/FormConsts';

const today = dayjs();
interface HrDetailsFormProps {
  initialData: EmployeeHrDetailsFormData;
  onSubmit: (data: EmployeeHrDetailsFormData) => void;
  employees?: { id: number; name: string }[];
  clients?: { id: number; companyName: string }[];
  isEditing: boolean,
  employee: Employee,
}

const HrDetailsForm: React.FC<HrDetailsFormProps> = ({
  initialData,
  onSubmit,
  employees,
  clients,
  isEditing,
  employee,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeHrDetailsFormData>({
    resolver: zodResolver(employeeHrDetailsSchema),
    defaultValues: initialData
  });
  const allErrors = Object.values(errors).map(error => error.message).filter(Boolean);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>{allErrors}
        <Typography variant="h6" gutterBottom className='pb-2'>
          {isEditing ? 'Edit HR Details' : 'Add HR Details'} for {formatedEmployeeName(employee)} ({initCapsForCitizenStatus(employee.citizenshipStatus)})
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
          {employee.citizenshipStatus === CITIZEN_CATEGORIES[2] &&
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="passType"
                  control={control}
                  rules={{ required: 'Pass Type is required' }}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth margin="normal" error={!!error}>
                      <InputLabel id="pass-type-label">Pass Type</InputLabel>
                      <Select
                        {...field}
                        labelId="pass-type-label"
                        id="passType"
                        label="Pass Type"
                        required
                      >
                        {VALID_PASS_TYPES.map((_passType: string) => {
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
          <Controller
            name="clientId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                margin="normal"
                fullWidth
                id="clientId"
                label="Client"
                error={!!errors.clientId}
                helperText={errors.clientId?.message}
              >
                <>
                  {/* <MenuItem key="-1" value={null}>None</MenuItem> */}
                  {clients?.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.companyName}
                    </MenuItem>
                  ))}
                </>
              </TextField>
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
          <div className="grid grid-cols-3">
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isEditing ? 'Update' : 'Add'} HR Details
            </Button>
          </div>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default HrDetailsForm;

