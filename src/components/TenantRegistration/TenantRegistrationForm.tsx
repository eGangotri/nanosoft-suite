'use client'

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import { TenantFormData, tenantSchema } from './schema';
import { SimpleCaptcha } from './SimpleCatpcha';

interface TenantFormProps {
  initialData?: TenantFormData;
  onSubmit: (data: TenantFormData) => Promise<void>;
  isEditMode: boolean;
}

export default function TenantForm({ initialData, onSubmit, isEditMode }: TenantFormProps) {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const { control, setValue, handleSubmit, formState: { errors } } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    mode: 'onBlur',
    defaultValues: initialData || {},
  });

  const handleFormSubmit = async (data: TenantFormData) => {
    if (!isEditMode && !isCaptchaValid) {
      setSubmitResult({ success: false, message: 'Please complete the captcha.' });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setSubmitResult({ success: true, message: `Tenant ${isEditMode ? 'updated' : 'registered'} successfully!` });
    } catch (error) {
      setSubmitResult({ success: false, message: `An error occurred. Please try again.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEditMode ? 'Edit Tenant' : 'Tenant Registration'}
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          {!isEditMode && (
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          )}
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Name"
                fullWidth
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            )}
          />
          <Controller
            name="uenNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="UEN Number (e.g., T09000001B)"
                fullWidth
                error={!!errors.uenNo}
                helperText={errors.uenNo?.message}
              />
            )}
          />
          <Controller
            name="entityType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.entityType}>
                <InputLabel>Entity Type</InputLabel>
                <Select {...field} label="Entity Type">
                  <MenuItem value="Pte Ltd">Pte Ltd</MenuItem>
                  <MenuItem value="LLP">LLP</MenuItem>
                  <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
                </Select>
                <FormHelperText>{errors.entityType?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Industry"
                fullWidth
                error={!!errors.industry}
                helperText={errors.industry?.message}
              />
            )}
          />
          <Controller
            name="contactNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact Number"
                fullWidth
                error={!!errors.contactNo}
                helperText={errors.contactNo?.message}
              />
            )}
          />
          <Controller
            name="domain"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Domain"
                fullWidth
                error={!!errors.domain}
                helperText={errors.domain?.message}
              />
            )}
          />
        </Box>
        {!isEditMode && (
          <Box sx={{ marginTop: 2 }}>
            <SimpleCaptcha
              onValidate={(isValid) => {
                setIsCaptchaValid(isValid);
                setValue('captcha', isValid ? 'valid' : 'invalid');
              }}
            />
          </Box>
        )}
        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || (!isEditMode && !isCaptchaValid)}
          >
            {isEditMode ? 'Update' : 'Register'}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={!!submitResult}
        autoHideDuration={6000}
        onClose={() => setSubmitResult(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSubmitResult(null)}
          severity={submitResult?.success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {submitResult?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

