'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../../providers/ThemeProvider';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
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
          {user ? (
            <>
            <Link href="/dashboard" passHref>
              <Button color="inherit" sx={{ color: isDarkMode ? 'inherit' : '#fff' }}>Dashboard</Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
            </>
          ) : (
      
            <Link href="/login" passHref>
              <Button color="inherit" sx={{ color: isDarkMode ? 'inherit' : '#fff' }}>Login</Button>
            </Link>
            
          )}
       
          <IconButton onClick={toggleTheme} color="inherit" sx={{ color: isDarkMode ? 'inherit' : '#fff' }}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 