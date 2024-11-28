import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { EmergencyContactPageProps, EmployeeEmergencyContactFormData, employeeEmergencyContactSchema } from './constants';

export const EmployeeEmergencyContactForm: React.FC<EmergencyContactPageProps> = ({
  initialData,
  onSubmit,
  employeeId,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeEmergencyContactFormData>({
    resolver: zodResolver(employeeEmergencyContactSchema),
    defaultValues: initialData || { employeeId },
  });

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
                <MenuItem value="spouse">Spouse</MenuItem>
                <MenuItem value="friend">Friend</MenuItem>
                <MenuItem value="parent">Parent</MenuItem>
                <MenuItem value="sibling">Sibling</MenuItem>
                <MenuItem value="landlord">Landlord</MenuItem>
                <MenuItem value="other">Other</MenuItem>
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

        <Button type="submit" variant="contained" color="primary">
          {initialData ? 'Update' : 'Add'} Emergency Contact
        </Button>
      </Box>
    </form>
  );
};

