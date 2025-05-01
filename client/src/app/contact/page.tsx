'use client';

import React from 'react';
import { Box, Typography, TextField, Button, Grid, Link, Alert } from '@mui/material';
import { Email, LinkedIn, GitHub, Twitter } from '@mui/icons-material';
import MainLayout from '../../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Implement email sending logic
      console.log(data);
      reset();
      alert('Message sent successfully!'); // Simple JavaScript alert
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" gutterBottom>
            Contact Me
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Feel free to reach out to me for any questions or opportunities.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Subject"
                  {...register('subject')}
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  {...register('message')}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  Send Message
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mt: { xs: 4, md: 0 } }}>
                <Typography variant="h6" gutterBottom>
                  Connect with me
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Link
                    href="mailto:varshneydheeraj9@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Email />
                    varshneydheeraj9@gmail.com
                  </Link>
                  <Link
                    href="https://linkedin.com/in/dheeraj-varshney-363a04298"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <LinkedIn />
                    LinkedIn Profile
                  </Link>
                  <Link
                    href="https://github.com/dheerajvarshn"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <GitHub />
                    GitHub Profile
                  </Link>
                  <Link
                    href="https://twitter.com/dheerajvarshn"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Twitter />
                    Twitter Profile
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </MainLayout>
  );
};

export default ContactPage; 