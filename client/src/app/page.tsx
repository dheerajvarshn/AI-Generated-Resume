'use client';

import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} textAlign="center">
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to Resume Portfolio
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Create and manage your professional portfolio
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            {user ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mr: 2 }}
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
                {/* <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => router.push('/register')}
                >
                  Register
                </Button> */}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Link href="/resume" passHref>
                <Button variant="contained" size="large">
                  View Resume
                </Button>
              </Link>
              <Link href="/projects" passHref>
                <Button variant="outlined" size="large">
                  View Projects
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button variant="outlined" size="large">
                  Contact Me
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 