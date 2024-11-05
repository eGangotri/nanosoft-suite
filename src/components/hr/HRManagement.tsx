import React from 'react';
import { Typography, Paper } from '@mui/material';
import AddEmployeePage from '@/components/hr/add-employee/page';
import EditEmployeePage from '@/components/hr/edit-employee/[id]/page';

const HRManagement: React.FC = () => {
  return (
    <Paper className="p-4 rounded-lg shadow">
      <Typography variant="h6" className="mb-2">HR Management</Typography>
      <Typography>Manage</Typography>
      <AddEmployeePage></AddEmployeePage>
      <EditEmployeePage params={{id:"1"}}></EditEmployeePage>
    </Paper>
  );
};

export default HRManagement;