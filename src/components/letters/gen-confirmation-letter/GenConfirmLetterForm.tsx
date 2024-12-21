'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ConfirmLetterData, confirmLetterSchema } from './confirmLetterSchema'
import { submitConfirmLetterForm } from './actions'
import dayjs from 'dayjs'
const today = dayjs();

export default function GenConfirmLetterForm() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm<ConfirmLetterData>({
        resolver: zodResolver(confirmLetterSchema),
        defaultValues: {
            salutation: 'Mr',
            isForeigner: false,
            salary: 0,
            leaves: 0,
            noticePeriod: 0,
            workingHours: 0,
        },
    })

    const isForeigner = watch('isForeigner')

    const onSubmit = async (data: ConfirmLetterData) => {
        const result = await submitConfirmLetterForm(data)
        if (result.success) {
            console.log('Form submitted successfully:', result.data)
            // Handle success (e.g., show a success message, reset form, etc.)
        } else {
            console.error('Form submission failed:', result.errors)
            // Handle errors (e.g., show error messages)
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <Typography variant="h4" gutterBottom>
                    Employee Information
                </Typography>

                <Controller
                    name="salutation"
                    control={control}
                    render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="salutation-label">Salutation</InputLabel>
                            <Select
                                {...field}
                                labelId="salutation-label"
                                label="Salutation"
                                error={!!errors.salutation}
                            >
                                <MenuItem value="Mr">Mr</MenuItem>
                                <MenuItem value="Mrs">Mrs</MenuItem>
                                <MenuItem value="Ms">Ms</MenuItem>
                                <MenuItem value="Dr">Dr</MenuItem>
                                <MenuItem value="Prof">Prof</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="First Name"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Last Name"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    name="isForeigner"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Is Foreigner"
                        />
                    )}
                />

                <Controller
                    name="identificationNumber"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label={isForeigner ? "Passport Number" : "NRIC Number"}
                            error={!!errors.identificationNumber}
                            helperText={errors.identificationNumber?.message}
                        />
                    )}
                />

                <Controller
                    name="position"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Position"
                            error={!!errors.position}
                            helperText={errors.position?.message}
                        />
                    )}
                />

                <Controller
                    name="salary"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Salary"
                            type="number"
                            error={!!errors.salary}
                            helperText={errors.salary?.message}
                        />
                    )}
                />

                <Controller
                    name="joiningDate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <DatePicker
                            value={field.value ? dayjs(field.value) : null} // Convert value to dayjs object
                            onChange={(newValue) => field.onChange(newValue?.toISOString() || null)} // Convert dayjs back to ISO string
                            maxDate={today} // Use dayjs for the maxDate
                            label="Joining Date"
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!error,
                                    helperText: error?.message,
                                },
                            }}
                        />
                    )}
                />

                <Controller
                    name="leaves"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Leaves"
                            type="number"
                            error={!!errors.leaves}
                            helperText={errors.leaves?.message}
                        />
                    )}
                />

                <Controller
                    name="noticePeriod"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Notice Period (in days)"
                            type="number"
                            error={!!errors.noticePeriod}
                            helperText={errors.noticePeriod?.message}
                        />
                    )}
                />

                <Controller
                    name="workingHours"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            fullWidth
                            label="Working Hours (per day)"
                            type="number"
                            error={!!errors.workingHours}
                            helperText={errors.workingHours?.message}
                        />
                    )}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </LocalizationProvider>
    )
}

