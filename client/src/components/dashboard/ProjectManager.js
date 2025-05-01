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
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Divider, 
  Chip, 
  Alert, 
  CircularProgress,
  Link,
  Tooltip
} from '@mui/material';
import { 
  Delete, 
  Edit, 
  Add, 
  LinkOutlined, 
  Code,
  GitHub,
  Visibility
} from '@mui/icons-material';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    image: ''
  });
  
  // Edit state
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);
  
  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getAllProjects();
      setProjects(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
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
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim())
    };
    
    try {
      if (editing) {
        // Update existing project
        await portfolioService.updateProject(currentId, projectData);
      } else {
        // Add new project
        await portfolioService.addProject(projectData);
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        technologies: '',
        link: '',
        image: ''
      });
      
      setEditing(false);
      setCurrentId(null);
      
      // Refresh projects list
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Failed to save project. Please try again.');
    }
  };
  
  // Set up form for editing
  const handleEdit = (project) => {
    setEditing(true);
    setCurrentId(project._id);
    
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      link: project.link || '',
      image: project.image || ''
    });
  };
  
  // Cancel editing
  const handleCancel = () => {
    setEditing(false);
    setCurrentId(null);
    
    setFormData({
      title: '',
      description: '',
      technologies: '',
      link: '',
      image: ''
    });
  };
  
  // Delete project
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await portfolioService.deleteProject(id);
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
        setError('Failed to delete project. Please try again.');
      }
    }
  };
  
  // Determine if URL is GitHub
  const isGitHubUrl = (url) => {
    if (!url) return false;
    return url.includes('github.com');
  };
  
  if (loading && projects.length === 0) {
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
          {editing ? 'Edit Project' : 'Add New Project'}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                variant="outlined"
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
                label="Technologies (comma-separated)"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, etc."
                required
                variant="outlined"
                helperText="List all technologies used in this project, separated by commas"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Project Link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://github.com/yourusername/project"
                variant="outlined"
                type="url"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/project-image.jpg"
                variant="outlined"
                type="url"
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
                  {editing ? 'Update Project' : 'Add Project'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 6, mb: 3 }}>
        Your Projects
      </Typography>
      
      {projects.length === 0 ? (
        <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No projects found. Add your first project above!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project._id}>
              <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {project.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={project.image}
                    alt={project.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      {project.title}
                    </Typography>
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(project)}
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(project._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mr: 1 }}>
                      <Code fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                      <Typography variant="caption" fontWeight="bold" color="text.secondary">
                        Tech:
                      </Typography>
                    </Box>
                    {project.technologies.map((tech, index) => (
                      <Chip 
                        key={index} 
                        label={tech} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </CardContent>
                
                {project.link && (
                  <Box sx={{ p: 2, mt: 'auto' }}>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Tooltip title={isGitHubUrl(project.link) ? "View on GitHub" : "View Project"}>
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
                      </Tooltip>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProjectManager; 