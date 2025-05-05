import React from 'react';
import { Box, Container, Typography } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      {/* <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Resume Portfolio. All rights reserved.
        </Typography>
      </Box> */}
    </Box>
  );
};

export default MainLayout; 