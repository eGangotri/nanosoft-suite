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
  const [loading, setLoading] = useState(true)
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      tenantName: "",
      roleName: "",
      roleId: "",
      employeeName: "",
      employeeId: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userWithData = await fetch(`/api/users/${userId}`);
          const response = await userWithData.json();
          const _userData = {
            tenantName: response?.tenantName || "",
            roleName: response?.roleName || "",
            roleId: response?.roleId || "",
            employeeName: response?.employeeName || "",
            employeeId: response?.employeeId || "",
            name: response?.name || "",
            email: response?.email || "",
            password: response?.Tenant.password || "",
            confirmPassword: response?.Tenant.password || "",
          }
          setUserData(_userData);
       //   setTenantName(response?.Tenant?.name || "");
          reset(_userData)
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
            <Typography>{userData?.tenantName}</Typography>
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
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.roleId}>
                  <InputLabel id="role-select-label">User Role</InputLabel>
                  <Select {...field} labelId="role-select-label" label="User Role">
                    <MenuItem value="">
                      <em>Select a role</em>
                    </MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.roleId && <FormHelperText>{errors.roleId.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              type="button"
              variant="contained"
              onClick={() => reset()}
            >
              Reset
            </Button>
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

