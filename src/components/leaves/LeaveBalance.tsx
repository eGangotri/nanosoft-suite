import { Typography, List, ListItem, ListItemText } from '@mui/material';

export default function LeaveBalance() {
  // In a real application, you'd fetch this data from your API
  const leaveBalance = {
    annual: 15,
    sick: 10,
    personal: 5,
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Leave Balance
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="Annual Leave" secondary={`${leaveBalance.annual} days`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Sick Leave" secondary={`${leaveBalance.sick} days`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Personal Leave" secondary={`${leaveBalance.personal} days`} />
        </ListItem>
      </List>
    </>
  );
}

