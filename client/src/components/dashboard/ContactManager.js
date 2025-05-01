import React, { useState, useEffect } from 'react';
import portfolioService from '../../services/portfolioService';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  IconButton, 
  Card, 
  CardContent, 
  Divider, 
  Alert, 
  CircularProgress, 
  Chip,
  Link,
  Tooltip
} from '@mui/material';
import { 
  Delete, 
  Email, 
  Phone, 
  AccessTime,
  Launch
} from '@mui/icons-material';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);
  
  // Fetch all contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await portfolioService.getAllContacts();
      setContacts(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Delete contact
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        await portfolioService.deleteContact(id);
        fetchContacts();
      } catch (err) {
        console.error('Error deleting contact:', err);
        setError('Failed to delete contact. Please try again.');
      }
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Calculate time since message
  const getTimeSince = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return diffDay === 1 ? '1 day ago' : `${diffDay} days ago`;
    } 
    if (diffHour > 0) {
      return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`;
    }
    if (diffMin > 0) {
      return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`;
    }
    return 'Just now';
  };
  
  if (loading && contacts.length === 0) {
    return (
      <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
        Contact Messages
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {contacts.length === 0 ? (
        <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No contact messages found.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {contacts.map((contact) => (
            <Grid item xs={12} md={6} key={contact._id}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {contact.name}
                    </Typography>
                    <Box>
                      <Tooltip title={formatDate(contact.date)}>
                        <Chip 
                          icon={<AccessTime fontSize="small" />} 
                          label={getTimeSince(contact.date)} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                      </Tooltip>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(contact._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Email fontSize="small" color="primary" sx={{ mr: 1 }} />
                      <Link href={`mailto:${contact.email}`} underline="hover">
                        {contact.email}
                      </Link>
                    </Box>
                    
                    {contact.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Phone fontSize="small" color="primary" sx={{ mr: 1 }} />
                        <Link href={`tel:${contact.phone}`} underline="hover">
                          {contact.phone}
                        </Link>
                      </Box>
                    )}
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Message:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {contact.message}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Tooltip title="Reply to email">
                      <IconButton 
                        color="primary" 
                        href={`mailto:${contact.email}?subject=Re: Your contact message`}
                      >
                        <Launch />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ContactManager; 