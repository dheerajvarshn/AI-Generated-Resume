import React, { useState, useEffect } from 'react';
import portfolioService from '../../services/portfolioService';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  IconButton, 
  Slider, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Chip, 
  LinearProgress, 
  Divider, 
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    level: 75,
    category: ''
  });
  
  // Edit state
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Category options
  const categories = [
    'Programming',
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Tools',
    'Design',
    'Mobile',
    'Other'
  ];
  
  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);
  
  // Fetch all skills
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getAllSkills();
      setSkills(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Failed to load skills. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'level' ? parseInt(value) : value
    });
  };

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    setFormData({
      ...formData,
      level: newValue
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editing) {
        // Update existing skill
        await portfolioService.updateSkill(currentId, formData);
      } else {
        // Add new skill
        await portfolioService.addSkill(formData);
      }
      
      // Reset form
      setFormData({
        name: '',
        level: 75,
        category: ''
      });
      
      setEditing(false);
      setCurrentId(null);
      
      // Refresh skills list
      fetchSkills();
    } catch (err) {
      console.error('Error saving skill:', err);
      setError('Failed to save skill. Please try again.');
    }
  };
  
  // Set up form for editing
  const handleEdit = (skill) => {
    setEditing(true);
    setCurrentId(skill._id);
    
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category
    });
  };
  
  // Cancel editing
  const handleCancel = () => {
    setEditing(false);
    setCurrentId(null);
    
    setFormData({
      name: '',
      level: 75,
      category: ''
    });
  };
  
  // Delete skill
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await portfolioService.deleteSkill(id);
        fetchSkills();
      } catch (err) {
        console.error('Error deleting skill:', err);
        setError('Failed to delete skill. Please try again.');
      }
    }
  };
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  
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
  
  if (loading && skills.length === 0) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          {editing ? 'Edit Skill' : 'Add New Skill'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Skill Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Typography gutterBottom>
                Proficiency Level: <strong>{formData.level}%</strong> ({getLevelText(formData.level)})
              </Typography>
              <Slider
                value={formData.level}
                onChange={handleSliderChange}
                name="level"
                step={5}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ color: getProgressColor(formData.level) }}
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
                  {editing ? 'Update Skill' : 'Add Skill'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 6, mb: 3 }}>
        Your Skills
      </Typography>
      
      {skills.length === 0 ? (
        <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">No skills found. Add your first skill above!</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Grid item xs={12} md={6} key={category}>
              <Paper elevation={2} sx={{ height: '100%' }}>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'primary.main', 
                  color: 'primary.contrastText',
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4
                }}>
                  <Typography variant="h6">{category}</Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  {categorySkills.map((skill) => (
                    <Box key={skill._id} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {skill.name}
                        </Typography>
                        <Box>
                          <Chip 
                            label={`${skill.level}% - ${getLevelText(skill.level)}`} 
                            size="small" 
                            sx={{ 
                              bgcolor: getProgressColor(skill.level), 
                              color: 'white',
                              mr: 1
                            }} 
                          />
                          <IconButton 
                            size="small" 
                            onClick={() => handleEdit(skill)}
                            color="primary"
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDelete(skill._id)}
                            color="error"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
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
  );
};

export default SkillsManager; 