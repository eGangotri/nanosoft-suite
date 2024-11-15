import React, { useState, useEffect } from 'react';
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
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';

type LeaveType = {
  id: number;
  name: string;
  description: string | null;
  default_days: number;
  leave_code: string | null;
};

export default function LeaveTypeCRUD() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [newLeaveType, setNewLeaveType] = useState<Omit<LeaveType, 'id'>>({ name: '', description: '', default_days: 0, leave_code: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const response = await fetch('/api/leave-types');
      if (!response.ok) throw new Error('Failed to fetch leave types');
      const data = await response.json();
      setLeaveTypes(data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/leave-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeaveType),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create leave type');
      }
      await fetchLeaveTypes();
      setNewLeaveType({ name: '', description: '', default_days: 0, leave_code: '' });
    } catch (error) {
      console.error('Error creating leave type:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const leaveTypeToUpdate = leaveTypes.find(lt => lt.id === id);
      if (!leaveTypeToUpdate) return;

      const response = await fetch(`/api/leave-types/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leaveTypeToUpdate),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update leave type');
      }
      setEditingId(null);
      await fetchLeaveTypes();
    } catch (error) {
      console.error('Error updating leave type:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/leave-types/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete leave type');
      await fetchLeaveTypes();
    } catch (error) {
      console.error('Error deleting leave type:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <CardHeader title="Leave Types Management" />
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            label="Name"
            value={newLeaveType.name}
            onChange={(e) => setNewLeaveType({ ...newLeaveType, name: e.target.value })}
          />
          <TextField
            label="Description"
            value={newLeaveType.description || ''}
            onChange={(e) => setNewLeaveType({ ...newLeaveType, description: e.target.value })}
          />
          <TextField
            label="Default Days"
            type="number"
            value={newLeaveType.default_days}
            onChange={(e) => setNewLeaveType({ ...newLeaveType, default_days: parseInt(e.target.value) })}
          />
          <TextField
            label="Leave Code"
            value={newLeaveType.leave_code || ''}
            onChange={(e) => setNewLeaveType({ ...newLeaveType, leave_code: e.target.value })}
          />
          <Button variant="contained" onClick={handleCreate}>Add Leave Type</Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Default Days</TableCell>
                <TableCell>Leave Code</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveTypes.map((leaveType) => (
                <TableRow key={leaveType.id}>
                  <TableCell>
                    {editingId === leaveType.id ? (
                      <TextField
                        value={leaveType.name}
                        onChange={(e) => setLeaveTypes(leaveTypes.map(lt => lt.id === leaveType.id ? { ...lt, name: e.target.value } : lt))}
                      />
                    ) : (
                      leaveType.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === leaveType.id ? (
                      <TextField
                        value={leaveType.description || ''}
                        onChange={(e) => setLeaveTypes(leaveTypes.map(lt => lt.id === leaveType.id ? { ...lt, description: e.target.value } : lt))}
                      />
                    ) : (
                      leaveType.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === leaveType.id ? (
                      <TextField
                        type="number"
                        value={leaveType.default_days}
                        onChange={(e) => setLeaveTypes(leaveTypes.map(lt => lt.id === leaveType.id ? { ...lt, default_days: parseInt(e.target.value) } : lt))}
                      />
                    ) : (
                      leaveType.default_days
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === leaveType.id ? (
                      <TextField
                        value={leaveType.leave_code || ''}
                        onChange={(e) => setLeaveTypes(leaveTypes.map(lt => lt.id === leaveType.id ? { ...lt, leave_code: e.target.value } : lt))}
                      />
                    ) : (
                      leaveType.leave_code
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === leaveType.id ? (
                      <IconButton onClick={() => handleUpdate(leaveType.id)} color="primary">
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => setEditingId(leaveType.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton onClick={() => handleDelete(leaveType.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}