'use client';

import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Button, Tabs, Tab } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import ProjectManager from '../../components/dashboard/ProjectManager';
import ExperienceManager from '../../components/dashboard/ExperienceManager';
import EducationManager from '../../components/dashboard/EducationManager';
import SkillsManager from '../../components/dashboard/SkillsManager';
import ContactManager from '../../components/dashboard/ContactManager';
import ResumeView from '../../components/dashboard/ResumeView';
import { useRouter } from 'next/navigation';

export default function Dashboard() {

  const router = useRouter();
  const [currentTab, setCurrentTab] = React.useState(0);


  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Portfolio Dashboard
          </Typography>
       
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Projects" />
          <Tab label="Experience" />
          <Tab label="Education" />
          <Tab label="Skills" />
          <Tab label="Contact Messages" />
          <Tab label="Full Resume" />
        </Tabs>

        {currentTab === 0 && <ProjectManager />}
        {currentTab === 1 && <ExperienceManager />}
        {currentTab === 2 && <EducationManager />}
        {currentTab === 3 && <SkillsManager />}
        {currentTab === 4 && <ContactManager />}
        {currentTab === 5 && <ResumeView />}
      </Container>
    </Box>
  );
} 