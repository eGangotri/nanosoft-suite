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
      tenantName: '',
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userWithData = await fetch(`/api/users/${userId}`);
          const response = await userWithData.json();
          const userData = {
            tenantName: response?.tenantName || "",
            roleName: response?.roleName || "",
            employeeName: response?.employeeName || "",
            employeeId: response?.employeeId || "",
            name: response?.name || "",
            email: response?.email || "",
            password: response?.Tenant.password || "",
          }
          setTenantName(response?.Tenant?.name || "");
          reset(userData)
          console.log('userWithData:', JSON.stringify(userWithData, null, 2));
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
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <InputLabel id="tenant-select-label">Tenant</InputLabel>
            <Typography>{tenantName}</Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label={userId ? 'New Password (optional)' : 'Password'}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                type="button"
                variant="contained" 
                onClick={() => router.push('/users')}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {userId ? 'Update' : 'Create'} User
              </Button>
          </div>
        </div>
      </form>
    </Paper >
  )
}

