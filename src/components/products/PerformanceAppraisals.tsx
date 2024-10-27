import React from 'react';
import { Typography, Paper } from '@mui/material';

const PerformanceAppraisals: React.FC = () => {
  return (
    <Paper className="p-4 rounded-lg shadow">
      <Typography variant="h6" className="mb-2">Performance Appraisals</Typography>
      <Typography>Manage your company's payroll efficiently.</Typography>
      {/* Add more Performance Appraisals specific content here */}
    </Paper>
  );
};

export default PerformanceAppraisals;