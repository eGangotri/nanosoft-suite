import React from 'react';
import { Typography, Paper } from '@mui/material';

const TaskSummary: React.FC = () => {
  return (
    <Paper className="p-4 rounded-lg shadow">
      <Typography variant="h6" className="mb-2">Task Summary</Typography>
      <Typography>Total Tasks: 75</Typography>
      <Typography>Completed: 50</Typography>
      <Typography>In Progress: 25</Typography>
    </Paper>
  );
};

export default TaskSummary;