'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HrDetailsFormData, employeeHrDetailsSchema } from './constants';

interface HrDetailsFormProps {
  initialData?: HrDetailsFormData;
  onSubmit: (data: HrDetailsFormData) => void;
  employees: { id: number; name: string }[];
  clients: { id: number; companyName: string }[];
}

const HrDetailsForm: React.FC<HrDetailsFormProps> = ({
  initialData,
  onSubmit,
  employees,
  clients,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HrDetailsFormData>({
    resolver: zodResolver(employeeHrDetailsSchema),
    defaultValues: initialData || {
      employeeId: 0,
      dateOfJoining: '',
      bonus: 0,
      passportNumber: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      passType: '',
      passExpiryDate: null,
      renewalApplyDate: null,
      newApplyDate: null,
      passCancelledDate: null,
      clientId: null,
      remarks: null,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Typography variant="h6" gutterBottom>
          Employee HR Details
        </Typography>
        <Controller
          name="employeeId"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              margin="normal"
              required
              fullWidth
              id="employeeId"
              label="Employee"
              error={!!errors.employeeId}
              helperText={errors.employeeId?.message}
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="dateOfJoining"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Date of Joining"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  error={!!errors.dateOfJoining}
                  helperText={errors.dateOfJoining?.message}
                />
              )}
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
        <Controller
          name="passportNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="passportNumber"
              label="Passport Number"
              error={!!errors.passportNumber}
              helperText={errors.passportNumber?.message}
            />
          )}
        />
        <Controller
          name="passportIssueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Passport Issue Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  error={!!errors.passportIssueDate}
                  helperText={errors.passportIssueDate?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="passportExpiryDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Passport Expiry Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  error={!!errors.passportExpiryDate}
                  helperText={errors.passportExpiryDate?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="passType"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="passType"
              label="Pass Type"
              error={!!errors.passType}
              helperText={errors.passType?.message}
            />
          )}
        />
        <Controller
          name="passExpiryDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Pass Expiry Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  error={!!errors.passExpiryDate}
                  helperText={errors.passExpiryDate?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="renewalApplyDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Renewal Apply Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  error={!!errors.renewalApplyDate}
                  helperText={errors.renewalApplyDate?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="newApplyDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="New Apply Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  error={!!errors.newApplyDate}
                  helperText={errors.newApplyDate?.message}
                />
              )}
            />
          )}
        />
        <Controller
          name="passCancelledDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Pass Cancelled Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  error={!!errors.passCancelledDate}
                  helperText={errors.passCancelledDate?.message}
                />
              )}
            />
          )}
        />
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
              <MenuItem value={null}>None</MenuItem>
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.companyName}
                </MenuItem>
              ))}
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {initialData ? 'Update' : 'Add'} Employee HR Details
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default HrDetailsForm;
