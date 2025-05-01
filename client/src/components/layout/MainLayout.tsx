import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../providers/ThemeProvider';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: isDarkMode ? 'inherit' : '#fff' }}>
            <Link href="/" passHref>
              <Button color="inherit" sx={{ color: isDarkMode ? 'inherit' : '#fff' }}>Resume Portfolio</Button>
            </Link>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }} >
            <Link href="/resume" passHref>
              <Button color="inherit" sx={{ color: isDarkMode ? 'inherit' : '#fff' }}>Resume</Button>
            </Link>
            <Link href="/projects" passHref>
              <Button color="inherit" sx={{ color: isDarkMode ? 'inherit' : '#fff' }}>Projects</Button>
            </Link>
            <Link href="/contact" passHref>
              <Button color="inherit" sx={{ color: isDarkMode ? 'inherit' : '#fff' }}>Contact</Button>
            </Link>
            <IconButton onClick={toggleTheme} color="inherit" sx={{ color: isDarkMode ? 'inherit' : '#fff' }}>
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Resume Portfolio. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout; 