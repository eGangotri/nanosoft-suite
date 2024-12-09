import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import LeaveBalance from './LeaveBalance';
import RecentLeaveRequests from './RecentLeaveRequests';
import LeaveUsageChart from './LeaveUsageChart';
import QuickActions from './QuickActions';

export default function LeavesDashboardContent() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Leave Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <LeaveBalance />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <RecentLeaveRequests />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <LeaveUsageChart />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <QuickActions />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

