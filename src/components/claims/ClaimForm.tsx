import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

export interface Claim {
  id?: number
  employeeId: number
  description: string
  amount: number
  status: ClaimStatus
  cycleMonth: number
  cycleYear: number
  createdAt?: Date
  updatedAt?: Date
  tenantId: number
}

export enum ClaimStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const claimSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, 'Description is required'),
  amount: z.coerce.number().min(0, 'Amount must be positive'),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  cycleMonth: z.number().min(1).max(12),
  cycleYear: z.number().min(2000).max(2100),
})

type ClaimFormProps = {
  claim?: Claim | null
  onSave: (claim: Claim) => void
}

export default function ClaimForm({ claim, onSave }: ClaimFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<Claim>({
    resolver: zodResolver(claimSchema),
    defaultValues: claim || {
      description: '',
      amount: 0,
      status: 'PENDING' as ClaimStatus,
      cycleMonth: new Date().getMonth() + 1,
      cycleYear: new Date().getFullYear(),
    },
  })

  const onSubmit = (data: Claim) => {
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Amount"
            type="number"
            fullWidth
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select {...field}>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <div className="flex space-x-4">
        <Controller
          name="cycleMonth"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select {...field}>
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="cycleYear"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Year"
              type="number"
              fullWidth
              error={!!errors.cycleYear}
              helperText={errors.cycleYear?.message}
            />
          )}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        {claim?.id ? 'Update Claim' : 'Add Claim'}
      </Button>
    </form>
  )
}

