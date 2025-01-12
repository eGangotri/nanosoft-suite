import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material'
import { Claim, ClaimFormProps, claimSchema, ClaimStatus } from './ClaimSchema'

export const ClaimForm: React.FC<ClaimFormProps> = ({ initialData, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<Claim>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      id: initialData?.id || 0,
      employeeId: initialData?.employeeId || 0,
      description: initialData?.description || '',
      amount: initialData?.amount || 0,
      status: initialData?.status || ClaimStatus.PENDING,
      cycleMonth: initialData?.cycleMonth || new Date().getMonth() + 1,
      cycleYear: initialData?.cycleYear || new Date().getFullYear(),
      tenantId: initialData?.tenantId || 0,
    },
  })

  const _onSubmit = (data: Claim) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Controller
            name="cycleMonth"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select {...field} label="Month">
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
        </Box>
        {/* <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                {Object.values(ClaimStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        /> */}
        <Button type="submit" variant="contained" color="primary">
          {initialData?.id ? 'Update Claim' : 'Add Claim'}
        </Button>
      </Box>
    </form>
  )
}

