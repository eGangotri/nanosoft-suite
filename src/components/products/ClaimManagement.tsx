import React from 'react';
import { Typography, Paper } from '@mui/material';

const ClaimManagement: React.FC = () => {
  return (
    <Paper className="p-4 rounded-lg shadow">
      <Typography variant="h6" className="mb-2">Claim Management</Typography>
      <Typography>Manage</Typography>
      {/* Add more Claim Management specific content here */}
    </Paper>
  );
};

export default ClaimManagement;