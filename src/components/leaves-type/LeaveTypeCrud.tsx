import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Box,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { LeaveTypeInput, leaveTypeSchema } from './constants';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { leaveTypesColumn } from './constants';

type LeaveType = {
  id: number;
  name: string;
  description: string | null;
  default_days: number | null;
  leave_code: string;
};


export default function LeaveTypeCRUD() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<LeaveTypeInput>({
    resolver: zodResolver(leaveTypeSchema),
    defaultValues: {
      name: '',
      description: '',
      default_days: 1,
      leave_code: ''
    }
  });

  const leavesTypeColumnWithActions = [...leaveTypesColumn,
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <>
        {editingId === params.id ? (
          <IconButton onClick={() => handleUpdate(params.id as number)} color="primary">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setEditingId(params.id as number)} color="primary">
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={() => handleDelete(params.id as number)} color="error">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
  ]
  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/leave-types');
      setIsLoading(false)
      if (!response.ok) throw new Error('Failed to fetch leave types');
      const data = await response.json();
      setLeaveTypes(data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
      setError('Failed to fetch leave types');
    }
  };

  const onSubmit = async (data: LeaveTypeInput) => {
    try {
      setIsLoading(true)
      console.log(`data ${JSON.stringify(data)}`);
      const response = await fetch('/api/leave-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create leave type');
      }
      await fetchLeaveTypes();
      reset();
    } catch (error) {
      console.error('Error creating leave type:', error);
      setError(error instanceof Error ? error.message : 'Failed to create leave type');
    }
    finally {
      setIsLoading(false)
    }
  };

  const handleUpdate = async (id: number) => {
    const leaveTypeToUpdate = leaveTypes.find(lt => lt.id === id);
    if (!leaveTypeToUpdate) return;

    try {
      setIsLoading(true)
      const response = await fetch(`/api/leave-types/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leaveTypeToUpdate),
      });
      setIsLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update leave type');
      }
      setEditingId(null);
      await fetchLeaveTypes();
    } catch (error) {
      console.error('Error updating leave type:', error);
      setError(error instanceof Error ? error.message : 'Failed to update leave type');
    }
  };
  const handleCellEditCommit = (params: GridRenderCellParams) => {
    // const updatedLeaveTypes = leaveTypes.map(lt =>
    //   lt.id === params.id ? { ...lt, [params.field]: params.value } : lt
    // );
    // setLeaveTypes(updatedLeaveTypes);
  };

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(`leave-type-del-${id}`, false);
      const response = await fetch(`/api/leave-types/${id}`, { method: 'DELETE' });
      setIsLoading(`leave-type-del-${id}`, false);
      if (!response.ok) throw new Error('Failed to delete leave type');
      await fetchLeaveTypes();
    } catch (error) {
      console.error('Error deleting leave type:', error);
      setError('Failed to delete leave type');
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
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
                />
              )}
            />
            <Button type="submit" variant="contained">Add Leave Type</Button>
          </Box>
        </form>

        <Paper style={{ height: 400, width: '100%' }}>
          {isLoading ?
            <div className="flex justify-center items-center h-80vh">
              <CircularProgress size={24} />
            </div> :
            <DataGrid
              rows={leaveTypes}
              columns={leavesTypeColumnWithActions}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5]}
            />}
        </Paper>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}