import { Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LeaveUsageChart() {
  // In a real application, you'd fetch this data from your API
  const data = [
    { month: 'Jan', annual: 2, sick: 1, personal: 0 },
    { month: 'Feb', annual: 0, sick: 2, personal: 1 },
    { month: 'Mar', annual: 3, sick: 0, personal: 0 },
    { month: 'Apr', annual: 0, sick: 1, personal: 1 },
    { month: 'May', annual: 1, sick: 0, personal: 0 },
    { month: 'Jun', annual: 5, sick: 1, personal: 0 },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Leave Usage Over Time
      </Typography>
      {/* <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="annual" fill="#8884d8" />
          <Bar dataKey="sick" fill="#82ca9d" />
          <Bar dataKey="personal" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer> */}
    </>
  );
}

