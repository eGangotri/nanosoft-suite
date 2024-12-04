import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { EmergencyContactPageProps, EmployeeEmergencyContactFormData, employeeEmergencyContactSchema } from './constants';
import { EMERGENCY_CONTACT_CATEGORIES_VALUES } from '@/utils/FormConsts';

export const EmployeeEmergencyContactForm: React.FC<EmergencyContactPageProps> = ({
  initialData,
  onSubmit = () => {},
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeEmergencyContactFormData>({
    resolver: zodResolver(employeeEmergencyContactSchema),
    defaultValues: initialData,
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

        <Button type="submit" variant="contained" color="primary">
          {initialData && initialData?.id && initialData?.id > 0 ? 'Update' : 'Add'} Emergency Contact
        </Button>
      </Box>
    </form>
  );
};

