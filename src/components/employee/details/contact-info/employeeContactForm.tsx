import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, CircularProgress } from '@mui/material';
import { EmergencyContactPageProps, EmployeeEmergencyContactFormData, employeeEmergencyContactSchema } from './constants';
import { EMERGENCY_CONTACT_CATEGORIES_VALUES } from '@/utils/FormConsts';
import { useRouter } from 'next/navigation'

export const EmployeeEmergencyContactForm: React.FC<EmergencyContactPageProps> = ({
  initialData,
  isLoading = false,
  onSubmit = () => { },
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeEmergencyContactFormData>({
    resolver: zodResolver(employeeEmergencyContactSchema),
    defaultValues: initialData,
  });
  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="personName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Person Name"
              error={!!errors.personName}
              helperText={errors.personName?.message}
            />
          )}
        />

        <Controller
          name="relationship"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.relationship}>
              <InputLabel>Relationship</InputLabel>
              <Select {...field} label="Relationship">
                {EMERGENCY_CONTACT_CATEGORIES_VALUES.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))
                }
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="mobile"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Mobile"
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              multiline
              rows={3}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button type="submit" fullWidth variant="contained" className="mr-2 pr-2">
            {isLoading ? <CircularProgress size={24} /> :
              initialData && initialData?.id && initialData?.id > 0 ? 'Update' : 'Add'}
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
    </form>
  );
};

