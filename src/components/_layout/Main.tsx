import React from 'react';
import { Box, CssBaseline } from '@mui/material';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <CssBaseline />
      {children}
    </Box>
  );
};

export default MainContent;