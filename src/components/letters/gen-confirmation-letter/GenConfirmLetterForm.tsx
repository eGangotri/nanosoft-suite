'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
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
import EmployeeConfirmationLetter from './confirmationLetter';
import { pdf } from '@react-pdf/renderer'

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

            const blob = await pdf(<EmployeeConfirmationLetter data={data} />).toBlob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${data.firstName}_${data.lastName}_confirmation_letter.pdf`
            link.click()
            URL.revokeObjectURL(url)
        } else {
            console.error('Form submission failed:', result.errors)
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Employee Information</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Controller
                                name="salutation"
                                control={control}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="salutation-label">Salutation</InputLabel>
                                        <Select
                                            {...field}
                                            labelId="salutation-label"
                                            label="Salutation"
                                            error={!!errors.salutation}
                                            className="w-full"
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
                        </div>
                        <div>
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="First Name"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Last Name"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="position"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Position"
                                        error={!!errors.position}
                                        helperText={errors.position?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="salary"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Salary"
                                        type="number"
                                        error={!!errors.salary}
                                        helperText={errors.salary?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="leaves"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Leaves"
                                        type="number"
                                        error={!!errors.leaves}
                                        helperText={errors.leaves?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="noticePeriod"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Notice Period (in days)"
                                        type="number"
                                        error={!!errors.noticePeriod}
                                        helperText={errors.noticePeriod?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="workingHours"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Working Hours (per day)"
                                        type="number"
                                        error={!!errors.workingHours}
                                        helperText={errors.workingHours?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div className="flex items-center">
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
                                        label={isForeigner ? "Passport Number" : "NRIC Number"}
                                        error={!!errors.identificationNumber}
                                        helperText={errors.identificationNumber?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Controller
                                name="joiningDate"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <DatePicker
                                        value={field.value ? dayjs(field.value) : null}
                                        onChange={(newValue) => field.onChange(newValue?.toISOString() || null)}
                                        maxDate={today}
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
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </LocalizationProvider>
    )
}

