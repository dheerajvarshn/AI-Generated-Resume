import React, { useState, useEffect } from 'react';
import portfolioService from '../../services/portfolioService';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  IconButton, 
  Divider, 
  Card,
  CardContent,
  CardActions,
  Chip,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  Delete, 
  Edit, 
  Add, 
  BusinessCenter, 
  DateRange, 
  Done 
} from '@mui/icons-material';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: ''
  });
  
  // Edit state
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Fetch experiences on component mount
  useEffect(() => {
    fetchExperiences();
  }, []);
  
  // Fetch all experiences
  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getAllExperiences();
      setExperiences(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching experiences:', err);
      setError('Failed to load experiences. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format data
    const experienceData = {
      ...formData,
      achievements: formData.achievements
        ? formData.achievements.split('\n').filter(item => item.trim() !== '')
        : []
    };
    
    try {
      if (editing) {
        // Update existing experience
        await portfolioService.updateExperience(currentId, experienceData);
      } else {
        // Add new experience
        await portfolioService.addExperience(experienceData);
      }
      
      // Reset form
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: ''
      });
      
      setEditing(false);
      setCurrentId(null);
      
      // Refresh experiences list
      fetchExperiences();
    } catch (err) {
      console.error('Error saving experience:', err);
      setError('Failed to save experience. Please try again.');
    }
  };
  
  // Set up form for editing
  const handleEdit = (experience) => {
    setEditing(true);
    setCurrentId(experience._id);
    
    setFormData({
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
      endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
      description: experience.description,
      achievements: experience.achievements ? experience.achievements.join('\n') : ''
    });
  };
  
  // Cancel editing
  const handleCancel = () => {
    setEditing(false);
    setCurrentId(null);
    
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: ''
    });
  };
  
  // Delete experience
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await portfolioService.deleteExperience(id);
        fetchExperiences();
      } catch (err) {
        console.error('Error deleting experience:', err);
        setError('Failed to delete experience. Please try again.');
      }
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  if (loading && experiences.length === 0) {
    return (
      <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          {editing ? 'Edit Experience' : 'Add New Experience'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date (leave empty for current)"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Achievements (one per line)"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                placeholder="Increased sales by 25%&#10;Reduced costs by 15%&#10;Implemented new system"
                helperText="List your achievements, one per line"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {editing && (
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={editing ? <Edit /> : <Add />}
                  color="primary"
                >
                  {editing ? 'Update Experience' : 'Add Experience'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 6, mb: 3 }}>
        Your Work Experience
      </Typography>
      
      {experiences.length === 0 ? (
        <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No experiences found. Add your first work experience above!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {experiences.map((experience) => (
            <Grid item xs={12} key={experience._id}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {experience.position}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <BusinessCenter fontSize="small" color="primary" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" color="text.secondary">
                          {experience.company}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DateRange fontSize="small" color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(experience)}
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(experience._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body1" paragraph>
                    {experience.description}
                  </Typography>
                  
                  {experience.achievements && experience.achievements.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                        Key Achievements
                      </Typography>
                      <List dense disablePadding>
                        {experience.achievements.map((achievement, index) => (
                          <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <Done color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={achievement} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ExperienceManager; 