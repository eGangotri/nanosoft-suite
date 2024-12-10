'use client'

import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

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
      <BarChart
        xAxis={[{ scaleType: 'band', data: data.map(item => item.month) }]}
        series={[
          { dataKey: 'annual', label: 'Annual', color: '#8884d8' },
          { dataKey: 'sick', label: 'Sick', color: '#82ca9d' },
          { dataKey: 'personal', label: 'Personal', color: '#ffc658' },
        ]}
        dataset={data}
        height={300}
        width={500}
      />
    </>
  );
}

