import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '../providers/ThemeProvider';
import { AuthProvider } from '../contexts/AuthContext';
import Header from '../components/layout/Header';
import { Box, Container, Typography } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resume Portfolio',
  description: 'A professional resume portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <Container component="main" sx={{ flex: 1, py: 4 }}>
                {children}
              </Container>
              <Box component="footer" sx={{ py: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} Resume Portfolio. All rights reserved.
                </Typography>
              </Box>
            </Box>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
