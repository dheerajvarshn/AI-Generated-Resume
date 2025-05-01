import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  LinearProgress, 
  Divider, 
  Button,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { 
  School, 
  Work, 
  Code, 
  Print,
  GitHub,
  Visibility  
} from '@mui/icons-material';
import portfolioService from '../../services/portfolioService';

const ResumeView = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await portfolioService.getProfileData();
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching resume data:', err);
        setError('Failed to load resume data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  // Determine if URL is GitHub
  const isGitHubUrl = (url) => {
    if (!url) return false;
    return url.includes('github.com');
  };

  // Get level text based on skill level
  const getLevelText = (level) => {
    if (level < 25) return 'Beginner';
    if (level < 50) return 'Intermediate';
    if (level < 75) return 'Advanced';
    return 'Expert';
  };

  // Get progress color based on skill level
  const getProgressColor = (level) => {
    if (level < 25) return '#FFA726'; // Orange
    if (level < 50) return '#29B6F6'; // Light Blue
    if (level < 75) return '#66BB6A'; // Green
    return '#5E35B1'; // Deep Purple
  };

  // Group skills by category
  const groupedSkills = userData?.skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) || {};

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', pb: 4 }} className="resume-view">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          {userData?.name || 'Your Resume'}
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Print />} 
          onClick={handlePrint}
          sx={{ '@media print': { display: 'none' } }}
        >
          Print Resume
        </Button>
      </Box>

      {userData?.title && (
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          {userData.title}
        </Typography>
      )}

      {userData?.summary && (
        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <Typography variant="body1">{userData.summary}</Typography>
        </Paper>
      )}

      {/* Experience Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Work color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" fontWeight="medium">Work Experience</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {userData?.experience?.length === 0 ? (
          <Typography variant="body1" color="text.secondary">No work experience added yet.</Typography>
        ) : (
          <Timeline position="alternate">
            {userData?.experience?.map((exp, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < userData.experience.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold">{exp.position}</Typography>
                    <Typography variant="subtitle1" color="primary.main" gutterBottom>
                      {exp.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {exp.description}
                    </Typography>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Key Achievements:
                        </Typography>
                        <ul style={{ paddingLeft: '1rem', margin: '0.5rem 0' }}>
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </Box>

      {/* Education Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <School color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" fontWeight="medium">Education</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {userData?.education?.length === 0 ? (
          <Typography variant="body1" color="text.secondary">No education added yet.</Typography>
        ) : (
          <Timeline position="alternate">
            {userData?.education?.map((edu, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="secondary" />
                  {index < userData.education.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold">{edu.degree}</Typography>
                    <Typography variant="subtitle1" color="secondary.main" gutterBottom>
                      {edu.field}
                    </Typography>
                    <Typography variant="subtitle2">
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Typography>
                    {edu.description && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {edu.description}
                      </Typography>
                    )}
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </Box>

      {/* Skills Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Code color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" fontWeight="medium">Skills</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {Object.keys(groupedSkills).length === 0 ? (
          <Typography variant="body1" color="text.secondary">No skills added yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <Grid item xs={12} md={6} key={category}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {category}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {skills.map((skill, idx) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body1">{skill.name}</Typography>
                          <Typography variant="body2">
                            {getLevelText(skill.level)}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={skill.level}
                          sx={{ 
                            height: 8, 
                            borderRadius: 5,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: getProgressColor(skill.level)
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Projects Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Code color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" fontWeight="medium">Projects</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {userData?.projects?.length === 0 ? (
          <Typography variant="body1" color="text.secondary">No projects added yet.</Typography>
        ) : (
          <Grid container spacing={3}>
            {userData?.projects?.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {project.technologies.map((tech, idx) => (
                        <Chip
                          key={idx}
                          label={tech}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                    {project.link && (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={isGitHubUrl(project.link) ? <GitHub /> : <Visibility />}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {isGitHubUrl(project.link) ? 'GitHub' : 'View Project'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Contact Information */}
      {(userData?.email || userData?.phone || userData?.location || userData?.website) && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight="medium" gutterBottom>
            Contact Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {userData?.email && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Email:</strong> {userData.email}
                </Typography>
              </Grid>
            )}
            {userData?.phone && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Phone:</strong> {userData.phone}
                </Typography>
              </Grid>
            )}
            {userData?.location && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Location:</strong> {userData.location}
                </Typography>
              </Grid>
            )}
            {userData?.website && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Website:</strong>{' '}
                  <a href={userData.website} target="_blank" rel="noopener noreferrer">
                    {userData.website}
                  </a>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white;
          }
          .MuiContainer-root {
            max-width: 100% !important;
            padding: 0 !important;
          }
          .resume-view {
            padding: 0 !important;
          }
          .MuiTimeline-root {
            padding: 0 !important;
          }
          .MuiTimelineItem-root {
            min-height: 50px !important;
          }
        }
      `}</style>
    </Box>
  );
};

export default ResumeView; 