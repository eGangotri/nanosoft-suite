import React from 'react';
import { Grid } from '@mui/material';
import EmployeeOverview from './EmployeeOverview';
import TaskSummary from './TaskSummary';
import Announcements from './Announcements';

const DashboardContent: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <EmployeeOverview />
      </Grid>
      <Grid item xs={12} md={4}>
        <TaskSummary />
      </Grid>
      <Grid item xs={12} md={4}>
        <Announcements />
      </Grid>
    </Grid>
  );
};

export default DashboardContent;