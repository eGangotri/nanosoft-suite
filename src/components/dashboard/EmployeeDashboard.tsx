import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Avatar, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PieChart } from '@mui/x-charts/PieChart';

// Mock data - replace with actual data fetching logic
const employeeData = {
  name: "John Doe",
  designation: "Software Engineer",
  email: "john.doe@example.com",
  leaveBalance: [
    { name: "Annual", value: 10 },
    { name: "Sick", value: 5 },
    { name: "Unpaid", value: 0 },
  ],
  upcomingLeaves: [
    { id: 1, type: "Annual", startDate: "2023-07-15", endDate: "2023-07-20", status: "Approved" },
    { id: 2, type: "Sick", startDate: "2023-08-05", endDate: "2023-08-06", status: "Pending" },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const leaveColumns: GridColDef[] = [
  { field: 'type', headerName: 'Type', width: 120 },
  { field: 'startDate', headerName: 'Start Date', width: 120 },
  { field: 'endDate', headerName: 'End Date', width: 120 },
  { field: 'status', headerName: 'Status', width: 120 },
];

export default function EmployeeDashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{employeeData.name.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="h5">{employeeData.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{employeeData.designation}</Typography>
                </Box>
              </Box>
              <Typography variant="body2">{employeeData.email}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Leave Balance</Typography>
              <Box sx={{ height: 200, width: '100%' }}>
                <PieChart
                  series={[
                    {
                      data: employeeData.leaveBalance,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                  ]}
                  height={200}
                  slotProps={{
                    legend: {
                      direction: 'column',
                      position: { vertical: 'middle', horizontal: 'right' },
                      padding: 0,
                    },
                  }}
                />
              </Box>
              <Box mt={2}>
                {employeeData.leaveBalance.map((item, index) => (
                  <Typography key={item.label} variant="body2">
                    <Box component="span" sx={{ color: COLORS[index], mr: 1 }}>■</Box>
                    {item.label}: {item.value} days
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Button variant="contained" fullWidth sx={{ mb: 1 }}>Apply for Leave</Button>
              <Button variant="outlined" fullWidth>View Pay Slip</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Upcoming Leaves</Typography>
              <DataGrid
                rows={employeeData.upcomingLeaves}
                columns={leaveColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                autoHeight
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

