import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ClaimFormData, claimSchema } from './claimScehma';

interface ClaimFormProps {
  onSubmit: (data: ClaimFormData) => void;
  initialData?: Partial<ClaimFormData>;
}

export const ClaimForm: React.FC<ClaimFormProps> = ({ onSubmit, initialData }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<ClaimFormData>({
    resolver: zodResolver(claimSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Amount"
              type="number"
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Date"
              renderInput={(params) => <TextField {...params} error={!!errors.date} helperText={errors.date?.message} />}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Claim
        </Button>
      </Box>
    </form>
  );
};

