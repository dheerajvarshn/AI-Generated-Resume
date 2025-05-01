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
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import { 
  Delete, 
  Edit, 
  Add, 
  School, 
  DateRange 
} from '@mui/icons-material';

const EducationManager = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  // Edit state
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Fetch education on component mount
  useEffect(() => {
    fetchEducation();
  }, []);
  
  // Fetch all education entries
  const fetchEducation = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getAllEducation();
      setEducation(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching education:', err);
      setError('Failed to load education data. Please try again.');
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
    
    try {
      if (editing) {
        // Update existing education
        await portfolioService.updateEducation(currentId, formData);
      } else {
        // Add new education
        await portfolioService.addEducation(formData);
      }
      
      // Reset form
      setFormData({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      
      setEditing(false);
      setCurrentId(null);
      
      // Refresh education list
      fetchEducation();
    } catch (err) {
      console.error('Error saving education:', err);
      setError('Failed to save education. Please try again.');
    }
  };
  
  // Set up form for editing
  const handleEdit = (edu) => {
    setEditing(true);
    setCurrentId(edu._id);
    
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : '',
      endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : '',
      description: edu.description || ''
    });
  };
  
  // Cancel editing
  const handleCancel = () => {
    setEditing(false);
    setCurrentId(null);
    
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };
  
  // Delete education
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await portfolioService.deleteEducation(id);
        fetchEducation();
      } catch (err) {
        console.error('Error deleting education:', err);
        setError('Failed to delete education. Please try again.');
      }
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  if (loading && education.length === 0) {
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
          {editing ? 'Edit Education' : 'Add New Education'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Field of Study"
                name="field"
                value={formData.field}
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
                label="End Date (leave empty if current)"
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
                variant="outlined"
                multiline
                rows={4}
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
                  {editing ? 'Update Education' : 'Add Education'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 6, mb: 3 }}>
        Your Education
      </Typography>
      
      {education.length === 0 ? (
        <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No education entries found. Add your first education above!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {education.map((edu) => (
            <Grid item xs={12} md={6} key={edu._id}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {edu.degree}
                      </Typography>
                      <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'medium', mb: 1 }}>
                        {edu.field}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(edu)}
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(edu._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 2 }}>
                    <School fontSize="small" color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {edu.institution}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DateRange fontSize="small" color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {edu.description && (
                    <Typography variant="body2" color="text.secondary">
                      {edu.description}
                    </Typography>
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

export default EducationManager; 