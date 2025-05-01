'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import MainLayout from '../../components/layout/MainLayout';
import { motion } from 'framer-motion';
import { getUserData, User } from '../../services/api';

const ResumePage = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        console.log(data);
        setUserData(data);
      } catch (err) {
        setError('Failed to load resume data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography>Loading...</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (error || !userData) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography color="error">{error || 'No data available'}</Typography>
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" gutterBottom>
            Professional Experience
          </Typography>
          <Timeline>
            {userData.experience?.map((exp, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < userData.experience.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6">{exp.position}</Typography>
                    <Typography color="primary" gutterBottom>
                      {exp.company}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {exp.period}
                    </Typography>
                    <Typography>{exp.description}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          <Typography variant="h2" sx={{ mt: 8 }} gutterBottom>
            Education
          </Typography>
          <Timeline>
            {userData?.education?.map((edu, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="secondary" />
                  {index < userData.education.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6">{edu.degree}</Typography>
                    <Typography color="primary" gutterBottom>
                      {edu.institution}
                    </Typography>
                    <Typography color="text.secondary">{edu.period}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>

          <Typography variant="h2" sx={{ mt: 8 }} gutterBottom>
            Skills
          </Typography>
          <Grid container spacing={3}>
            {userData?.skills?.map((skill, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {skill.name}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {skill.level}%
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </MainLayout>
  );
};

export default ResumePage; 