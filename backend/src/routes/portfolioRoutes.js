const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Resume = require('../models/Resume');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const checkOwnership = require('../middleware/checkOwnership');

// Get complete portfolio data
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get user's personal information
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's resume
    const resume = await Resume.findOne({ user: userId });

    // Get user's projects
    const projects = await Project.find({ user: userId });

    // Get user's contact information
    const contact = await Contact.findOne({ user: userId });

    // Combine all data
    const portfolioData = {
      personalInfo: user,
      resume: resume || null,
      projects: projects || [],
      contact: contact || null
    };

    res.json(portfolioData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio data', error: error.message });
  }
});

// Get public portfolio data (without sensitive information)
router.get('/public/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get user's public information
    const user = await User.findById(userId).select('name email title about skills experience education socialLinks');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's public projects
    const projects = await Project.find({ user: userId }).select('title description technologies image githubUrl liveUrl startDate endDate current');

    // Get user's public contact information
    const contact = await Contact.findOne({ user: userId }).select('email phone address socialLinks');

    // Combine all data
    const publicPortfolioData = {
      personalInfo: user,
      projects: projects || [],
      contact: contact || null
    };

    res.json(publicPortfolioData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public portfolio data', error: error.message });
  }
});

// Update personal information
router.put('/:userId/personal', [auth, checkOwnership], async (req, res) => {
  try {
  
    const userId = req.params.userId;
    const updates = req.body;
    console.log(req.body);

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // console.log(user);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating personal information', error: error.message });
  }
});

// Update resume
router.put('/:userId/resume', [auth, checkOwnership], async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const resume = await Resume.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      { new: true, upsert: true }
    );

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error: error.message });
  }
});

// Add or update project
router.put('/:userId/projects/:projectId?', [auth, checkOwnership], async (req, res) => {
  try {
    const userId = req.params.userId;
    const projectId = req.params.projectId;
    const projectData = req.body;

    let project;
    if (projectId) {
      // Update existing project
      project = await Project.findOneAndUpdate(
        { _id: projectId, user: userId },
        { $set: projectData },
        { new: true }
      );
    } else {
      // Create new project
      project = new Project({
        ...projectData,
        user: userId
      });
      await project.save();
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete project
router.delete('/:userId/projects/:projectId', [auth, checkOwnership], async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.projectId,
      user: req.params.userId
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

// Update contact information
router.put('/:userId/contact', [auth, checkOwnership], async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const contact = await Contact.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      { new: true, upsert: true }
    );

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact information', error: error.message });
  }
});

module.exports = router; 