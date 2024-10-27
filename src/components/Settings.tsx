import React from 'react';
import { Typography, Paper } from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Paper className="p-4 rounded-lg shadow">
      <Typography variant="h6" className="mb-2">Settings</Typography>
      <Typography>Configure your NanoSoft Suite settings here.</Typography>
      {/* Add settings options here */}
    </Paper>
  );
};

export default Settings;