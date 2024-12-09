import { Button, Typography, Box } from '@mui/material';

export default function QuickActions() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Button variant="contained" color="primary">
          Request Leave
        </Button>
        <Button variant="outlined" color="secondary">
          View Detailed Report
        </Button>
      </Box>
    </>
  );
}

