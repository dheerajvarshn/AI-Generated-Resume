const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Auth middleware
const auth = require('../middleware/auth');

// Get user data (portfolio data)
router.get('/', async (req, res) => {
  try {
    // Find admin user (portfolio owner)
    const user = await User.findOne({ role: 'admin' }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get authenticated user data for dashboard
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user data
router.put('/', auth, async (req, res) => {
  try {
    // Fields to update
    const { 
      name, title, summary, phone, location, website, socialLinks,
      skills, education, experience, projects
    } = req.body;
    
    // Build user object
    const userFields = {};
    if (name) userFields.name = name;
    if (title) userFields.title = title;
    if (summary) userFields.summary = summary;
    if (phone) userFields.phone = phone;
    if (location) userFields.location = location;
    if (website) userFields.website = website;
    if (socialLinks) userFields.socialLinks = socialLinks;
    if (skills) userFields.skills = skills;
    if (education) userFields.education = education;
    if (experience) userFields.experience = experience;
    if (projects) userFields.projects = projects;

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new contact message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }
    
    // Find admin user to receive the contact
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      return res.status(404).json({ message: 'Admin user not found' });
    }
    
    // Add new contact to admin's contacts array
    adminUser.contacts.push({
      name,
      email,
      phone,
      message,
      date: new Date()
    });
    
    await adminUser.save();
    
    res.status(201).json({ message: 'Contact message sent successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Routes to update specific sections

// Update projects section
router.put('/projects', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { projects: req.body.projects } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    console.error('Error updating projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update experience section
router.put('/experience', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { experience: req.body.experience } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update skills section
router.put('/skills', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { skills: req.body.skills } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    console.error('Error updating skills:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----- PROJECTS OPERATIONS -----

// Add a new project
router.post('/projects/add', auth, async (req, res) => {
  try {
    const { title, description, technologies, link, image } = req.body;
    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    const newProject = {
      title,
      description,
      technologies: technologies || [],
      link: link || '',
      image: image || ''
    };
    
    const user = await User.findById(req.user.id);
    user.projects.unshift(newProject); // Add to beginning of array
    await user.save();
    
    res.status(201).json(user.projects);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update specific project
router.put('/projects/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find project to update
    const projectIndex = user.projects.findIndex(
      project => project._id.toString() === req.params.id
    );
    
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const { title, description, technologies, link, image } = req.body;
    
    if (title) user.projects[projectIndex].title = title;
    if (description) user.projects[projectIndex].description = description;
    if (technologies) user.projects[projectIndex].technologies = technologies;
    if (link !== undefined) user.projects[projectIndex].link = link;
    if (image !== undefined) user.projects[projectIndex].image = image;
    
    await user.save();
    res.json(user.projects);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a project
router.delete('/projects/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find project to remove
    const removeIndex = user.projects.findIndex(
      project => project._id.toString() === req.params.id
    );
    
    if (removeIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Remove project
    user.projects.splice(removeIndex, 1);
    await user.save();
    
    res.json(user.projects);
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----- EXPERIENCE OPERATIONS -----

// Add a new experience
router.post('/experience/add', auth, async (req, res) => {
  try {
    const { company, position, startDate, endDate, description, achievements } = req.body;
    
    // Validate required fields
    if (!company || !position || !startDate || !description) {
      return res.status(400).json({ message: 'Company, position, start date, and description are required' });
    }
    
    const newExperience = {
      company,
      position,
      startDate,
      endDate: endDate || null,
      description,
      achievements: achievements || []
    };
    
    const user = await User.findById(req.user.id);
    user.experience.unshift(newExperience); // Add to beginning of array
    await user.save();
    
    res.status(201).json(user.experience);
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update specific experience
router.put('/experience/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find experience to update
    const expIndex = user.experience.findIndex(
      exp => exp._id.toString() === req.params.id
    );
    
    if (expIndex === -1) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    const { company, position, startDate, endDate, description, achievements } = req.body;
    
    if (company) user.experience[expIndex].company = company;
    if (position) user.experience[expIndex].position = position;
    if (startDate) user.experience[expIndex].startDate = startDate;
    if (endDate !== undefined) user.experience[expIndex].endDate = endDate;
    if (description) user.experience[expIndex].description = description;
    if (achievements) user.experience[expIndex].achievements = achievements;
    
    await user.save();
    res.json(user.experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an experience
router.delete('/experience/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find experience to remove
    const removeIndex = user.experience.findIndex(
      exp => exp._id.toString() === req.params.id
    );
    
    if (removeIndex === -1) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    // Remove experience
    user.experience.splice(removeIndex, 1);
    await user.save();
    
    res.json(user.experience);
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----- EDUCATION OPERATIONS -----

// Add a new education
router.post('/education/add', auth, async (req, res) => {
  try {
    const { institution, degree, field, startDate, endDate, description } = req.body;
    
    // Validate required fields
    if (!institution || !degree || !field || !startDate) {
      return res.status(400).json({ message: 'Institution, degree, field, and start date are required' });
    }
    
    const newEducation = {
      institution,
      degree,
      field,
      startDate,
      endDate: endDate || null,
      description: description || ''
    };
    
    const user = await User.findById(req.user.id);
    user.education.unshift(newEducation); // Add to beginning of array
    await user.save();
    
    res.status(201).json(user.education);
  } catch (error) {
    console.error('Error adding education:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update specific education
router.put('/education/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find education to update
    const eduIndex = user.education.findIndex(
      edu => edu._id.toString() === req.params.id
    );
    
    if (eduIndex === -1) {
      return res.status(404).json({ message: 'Education not found' });
    }
    
    const { institution, degree, field, startDate, endDate, description } = req.body;
    
    if (institution) user.education[eduIndex].institution = institution;
    if (degree) user.education[eduIndex].degree = degree;
    if (field) user.education[eduIndex].field = field;
    if (startDate) user.education[eduIndex].startDate = startDate;
    if (endDate !== undefined) user.education[eduIndex].endDate = endDate;
    if (description !== undefined) user.education[eduIndex].description = description;
    
    await user.save();
    res.json(user.education);
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an education
router.delete('/education/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find education to remove
    const removeIndex = user.education.findIndex(
      edu => edu._id.toString() === req.params.id
    );
    
    if (removeIndex === -1) {
      return res.status(404).json({ message: 'Education not found' });
    }
    
    // Remove education
    user.education.splice(removeIndex, 1);
    await user.save();
    
    res.json(user.education);
  } catch (error) {
    console.error('Error deleting education:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----- SKILLS OPERATIONS -----

// Add a new skill
router.post('/skills/add', auth, async (req, res) => {
  try {
    const { name, level, category } = req.body;
    
    // Validate required fields
    if (!name || !level || !category) {
      return res.status(400).json({ message: 'Name, level, and category are required' });
    }
    
    const newSkill = {
      name,
      level: parseInt(level),
      category
    };
    
    const user = await User.findById(req.user.id);
    user.skills.push(newSkill);
    await user.save();
    
    res.status(201).json(user.skills);
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update specific skill
router.put('/skills/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find skill to update
    const skillIndex = user.skills.findIndex(
      skill => skill._id.toString() === req.params.id
    );
    
    if (skillIndex === -1) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    const { name, level, category } = req.body;
    
    if (name) user.skills[skillIndex].name = name;
    if (level) user.skills[skillIndex].level = parseInt(level);
    if (category) user.skills[skillIndex].category = category;
    
    await user.save();
    res.json(user.skills);
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a skill
router.delete('/skills/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find skill to remove
    const removeIndex = user.skills.findIndex(
      skill => skill._id.toString() === req.params.id
    );
    
    if (removeIndex === -1) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    // Remove skill
    user.skills.splice(removeIndex, 1);
    await user.save();
    
    res.json(user.skills);
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----- CONTACTS OPERATIONS -----

// Get all contacts
router.get('/contacts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a contact
router.delete('/contacts/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Find contact to remove
    const removeIndex = user.contacts.findIndex(
      contact => contact._id.toString() === req.params.id
    );
    
    if (removeIndex === -1) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    // Remove contact
    user.contacts.splice(removeIndex, 1);
    await user.save();
    
    res.json(user.contacts);
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 