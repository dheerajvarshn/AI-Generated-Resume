const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

// Get all resumes (public)
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().populate('user', 'name email');
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error: error.message });
  }
});

// Get user's resume
router.get('/me', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume', error: error.message });
  }
});

// Create resume
router.post('/', auth, async (req, res) => {
  try {
    const existingResume = await Resume.findOne({ user: req.user._id });
    if (existingResume) {
      return res.status(400).json({ message: 'Resume already exists' });
    }

    const resume = new Resume({
      ...req.body,
      user: req.user._id
    });

    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error creating resume', error: error.message });
  }
});

// Update resume
router.put('/me', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    Object.assign(resume, req.body);
    await resume.save();
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error: error.message });
  }
});

// Delete resume
router.delete('/me', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error: error.message });
  }
});

module.exports = router; 