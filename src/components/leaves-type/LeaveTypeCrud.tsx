'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Box,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material'
import { 
  DataGrid, 
  GridColDef, 
  GridRowModes, 
  GridRowModesModel, 
  GridEventListener,
  GridRowId,
  GridValidRowModel,
} from '@mui/x-data-grid'

const leaveTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().nullable(),
  default_days: z.number().min(0, 'Default days must be 0 or more').nullable(),
  leave_code: z.string().min(1, 'Leave code is required'),
})

type LeaveTypeInput = z.infer<typeof leaveTypeSchema>

type LeaveType = LeaveTypeInput & { id: number }

export default function LeaveTypeCRUD() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([])
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({})
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 })

  const { control, handleSubmit, reset, formState: { errors } } = useForm<LeaveTypeInput>({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: {
      name: '',
      description: '',
      default_days: 1,
      leave_code: '',
    },
  })

  const fetchLeaveTypes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/leave-types')
      if (!response.ok) throw new Error('Failed to fetch leave types')
      const data = await response.json()
      setLeaveTypes(data)
    } catch (error) {
      console.error('Error fetching leave types:', error)
      setError('Failed to fetch leave types')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaveTypes()
  }, [])

  const onSubmit = async (data: LeaveTypeInput) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/leave-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create leave type')
      }
      await fetchLeaveTypes()
      reset()
    } catch (error) {
      console.error('Error creating leave type:', error)
      setError(error instanceof Error ? error.message : 'Failed to create leave type')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRowEditStart: GridEventListener<'rowEditStart'> = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })
  }

  const processRowUpdate = async (newRow: GridValidRowModel) => {
    try {
      const validatedData = leaveTypeSchema.parse(newRow)
      setIsLoading(true)
      console.log(`Updating row with ID: ${newRow.id} and data:`, validatedData)
      const response = await fetch(`/api/leave-types/${newRow.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update leave type')
      }
      await fetchLeaveTypes()
      return newRow
    } catch (error) {
      console.error('Error updating leave type:', error)
      setError(error instanceof z.ZodError ? error.errors[0].message : 'Failed to update leave type')
      return newRow
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/leave-types/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete leave type')
      await fetchLeaveTypes()
    } catch (error) {
      console.error('Error deleting leave type:', error)
      setError('Failed to delete leave type')
    } finally {
      setIsLoading(false)
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 200, editable: true },
    { field: 'default_days', headerName: 'Default Days', type: 'number', width: 130, editable: true },
    { field: 'leave_code', headerName: 'Leave Code', width: 130, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <IconButton key="save" onClick={handleSaveClick(id)}>
              <SaveIcon />
            </IconButton>,
            <IconButton key="cancel" onClick={handleCancelClick(id)}>
              <CancelIcon />
            </IconButton>,
          ]
        }

        return [
          <IconButton key="edit" onClick={handleEditClick(id)}>
            <EditIcon />
          </IconButton>,
          <IconButton key="delete" onClick={() => handleDelete(id as number)} color="error">
            <DeleteIcon />
          </IconButton>,
        ]
      },
    },
  ]

  return (
    <Card sx={{ margin: 'auto', mt: 4 }}>
      <CardHeader title="Leave Types Management" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
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
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
            <Controller
              name="default_days"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Default Days"
                  type="number"
                  error={!!errors.default_days}
                  helperText={errors.default_days?.message}
                  required
                />
              )}
            />
            <Controller
              name="leave_code"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Leave Code"
                  error={!!errors.leave_code}
                  helperText={errors.leave_code?.message}
                  required
                />
              )}
            />
            <Button type="submit" variant="contained">Add Leave Type</Button>
          </Box>
        </form>

        <Box style={{ height: 400, width: '100%' }}>
          {isLoading ? (
            <Box className="flex justify-center items-center h-80vh">
              <CircularProgress size={24} />
            </Box>
          ) : (
            <DataGrid
              rows={leaveTypes}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5]}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slotProps={{
                toolbar: { setRowModesModel },
              }}
            />
          )}
        </Box>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  )
}