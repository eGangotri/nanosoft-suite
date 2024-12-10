import React from 'react';
import { Typography, Paper } from '@mui/material';

const Announcements: React.FC = () => {
  return (
    <Paper className="p-4 rounded-lg shadow">
      <Typography variant="h6" className="mb-2">Announcements</Typography>
      <Typography>New project kickoff meeting tomorrow at 10 AM</Typography>
    </Paper>
  );
};

export default Announcements;