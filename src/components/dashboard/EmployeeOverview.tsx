import React from 'react';
import { Typography, Paper } from '@mui/material';

const EmployeeOverview: React.FC = () => {
  return (
    <Paper className="p-4 rounded-lg shadow">
      <Typography variant="h6" className="mb-2">Employee Overview</Typography>
      <Typography>Total Employees: 150</Typography>
      <Typography>Active: 140</Typography>
      <Typography>On Leave: 10</Typography>
    </Paper>
  );
};

export default EmployeeOverview;