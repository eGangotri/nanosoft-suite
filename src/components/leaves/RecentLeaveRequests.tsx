import { Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function RecentLeaveRequests() {
  // In a real application, you'd fetch this data from your API
  const recentRequests = [
    { id: 1, type: 'Annual', startDate: '2023-07-01', endDate: '2023-07-05', status: 'Approved' },
    { id: 2, type: 'Sick', startDate: '2023-06-15', endDate: '2023-06-16', status: 'Approved' },
    { id: 3, type: 'Personal', startDate: '2023-08-10', endDate: '2023-08-10', status: 'Pending' },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Recent Leave Requests
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.startDate}</TableCell>
              <TableCell>{request.endDate}</TableCell>
              <TableCell>{request.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

