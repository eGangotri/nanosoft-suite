'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { UserFormData, userSchema } from '../schema'
import { getUserWithRelations } from '@/services/UserService'


interface UserFormProps {
  userId?: string
}

export default function UserForm({ userId }: UserFormProps) {
  const router = useRouter()
  const [userData, setUserData] = useState<UserFormData | null>(null)
  const [tenantName, setTenantName] = useState<string>('');
  const [loading, setLoading] = useState(true)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      tenantId: '',
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userWithData = await getUserWithRelations(userId)
          console.log('userWithData:', userWithData);
          const userData = {
            tenantId: userWithData?.Tenant.id.toString() || '',
            name: userWithData?.name || "",
            email: userWithData?.email || "",
            password: userWithData?.Tenant.password || "",
          }
          setTenantName(userWithData?.Tenant?.name || "");
          reset(userData)
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }
    fetchUserData().then(() => setLoading(false));
  }, [userId, reset])

  const onSubmit = async (data: UserFormData) => {
    try {
      const url = userId ? `/api/users/${userId}` : '/api/users'
      const method = userId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save user')
      }

      router.push('/users')
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Paper elevation={3} sx={{ p: 4, m: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {userId ? 'Edit User' : 'Create User'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.tenantId}>
              <InputLabel id="tenant-select-label">Tenant</InputLabel>
              <Typography>{tenantName}</Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label={userId ? 'New Password (optional)' : 'Password'}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="button"
                onClick={() => router.push('/users')}
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {userId ? 'Update' : 'Create'} User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

