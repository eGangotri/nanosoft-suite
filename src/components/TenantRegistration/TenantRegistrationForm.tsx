'use client'

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tenantSchema, TenantFormData } from './schema';
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
} from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";
import { SimpleCaptcha } from './SimpleCatpcha';

export default function TenantRegistrationForm() {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: TenantFormData) => {
    console.log(`data: ${JSON.stringify(data)}`);
    tenantSchema.parse(data);
    if (isCaptchaValid) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
          setSubmitResult({ success: true, message: 'Registration successful!' });
        } else {
          setSubmitResult({ success: false, message: result.error || 'Registration failed. Please try again.' });
        }
      } catch (error) {
        setSubmitResult({ success: false, message: 'An error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSubmitResult({ success: false, message: 'Please complete the captcha.' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Tenant Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-1">
          <Controller
            name="name"
            control={control}
            defaultValue=""
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
        </div>
        <div className="col-span-1">
          <Controller
            name="email"
            control={control}
            defaultValue=""
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
        </div>
        <div className="col-span-1">
          <Controller
            name="password"
            control={control}
            defaultValue=""
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
        </div>
        <div className="col-span-1">
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
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
        </div>
        <div className="col-span-1">
          <Controller
            name="uenNo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="UEN Number.Ex. T09000001B"
                fullWidth
                error={!!errors.uenNo}
                helperText={errors.uenNo?.message}
              />
            )}
          />
        </div>
        <div className="col-span-1">
          <Controller
            name="entityType"
            control={control}
            defaultValue="Pte Ltd"
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
        </div>
        <div className="col-span-1">
          <Controller
            name="industry"
            control={control}
            defaultValue=""
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
        </div>
        <div className="col-span-1">
          <Controller
            name="contactNo"
            control={control}
            defaultValue=""
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
        </div>
        {/* <div className="col-span-1">
          <ReCAPTCHA
            sitekey="6LdZTKYqAAAAADDDaJRCMjS_SfrhqtIPQDnBkFPN"
            onChange={(value: string) => {
              setCaptchaValue(value);
            }}
          />
          {errors.captcha && (
            <p className="text-red-500 text-sm mt-1">{errors.captcha.message}</p>
          )}
        </div> */}
        <div className="col-span-1 mt-4">
          <SimpleCaptcha onValidate={setIsCaptchaValid} />
        </div>
        <div className="col-span-1  mt-4">
          <Controller
            name="domain"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Domain"
                error={!!errors.domain}
                helperText={errors.domain?.message}
              />
            )}
          />
        </div>
        <div className="mt-4">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isCaptchaValid}
          >
            Register
          </Button>
        </div>
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
    </div>
  );
}

