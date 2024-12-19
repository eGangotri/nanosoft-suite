import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PieChart } from '@mui/x-charts/PieChart';
import { employeeInitials, formatedEmployeeNameWithMidInitials } from '../employee/EmployeeUtils';
import { createEmptyEmployee } from '@/app/employee/employee/EmployeeUtil';
import { getEmployeeData } from '@/services/employeeService';

// Mock data - replace with actual data fetching logic
const _employeeData = {
  name: "John Doe",
  designation: "Software Engineer",
  email: "john.doe@example.com",
  leaveBalance: [
    { id: 0, value: 10, label: 'Annual' },
    { id: 1, value: 5, label: 'Sick' },
    { id: 2, value: 0, label: 'Unpaid' },
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

export default function EmployeeDashboard({ employeeId }: { employeeId: number }) {

  const [employeeData, setEmployeeData] = React.useState(createEmptyEmployee());
  useEffect(() => {
    const fetchEmp = async () => {
      const _data = await getEmployeeData(employeeId);
      if (_data) {
        setEmployeeData(_data);
      }
    }
    fetchEmp();
  }, [employeeId]);

  return (
    <div className="flex-grow p-3">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/3 px-3 mb-6">
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ width: 60, height: 60, mr: 2 }}>{employeeInitials(employeeData)}</Avatar>
                <Box>
                  <Typography variant="h5">{formatedEmployeeNameWithMidInitials(employeeData)}</Typography>
                  <Typography variant="body2" color="text.secondary">{employeeData.designation}</Typography>
                </Box>
              </Box>
              <Typography variant="body2">{employeeData.email}</Typography>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6">
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Leave Balance</Typography>
              <Box sx={{ height: 200, width: '100%' }}>
                <PieChart
                  series={[
                    {
                      data: _employeeData.leaveBalance,
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
                {_employeeData.leaveBalance.map((item, index) => (
                  <Typography key={item.label} variant="body2">
                    <Box component="span" sx={{ color: COLORS[index], mr: 1 }}>■</Box>
                    {item.label}: {item.value} days
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6">
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Button variant="contained" fullWidth sx={{ mb: 1 }}>Apply for Leave</Button>
              <Button variant="outlined" fullWidth>View Pay Slip</Button>
            </CardContent>
          </Card>
        </div>

        <div className="w-full px-3">
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Upcoming Leaves</Typography>
              <DataGrid
                rows={_employeeData.upcomingLeaves}
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
        </div>
      </div>
    </div>
  );
}

