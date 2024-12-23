import React from 'react';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';

interface ErrorPanelProps {
  errors: { field: string; message: string | undefined }[];
}

const ErrorPanel: React.FC<ErrorPanelProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity="error">
        <AlertTitle>Form Errors</AlertTitle>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{`${error.field}: ${error.message}`}</li>
          ))}
        </ul>
      </Alert>
      <Typography variant="body2" color="textSecondary">
        Please correct the errors above and try again.
        </Typography>
    </Box>
  );
};

export default ErrorPanel;

