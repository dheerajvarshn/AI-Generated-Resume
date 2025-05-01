const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// Get all contacts (public)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().populate('user', 'name email');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Get user's contact
router.get('/me', auth, async (req, res) => {
  try {
    const contact = await Contact.findOne({ user: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
});

// Create contact
router.post('/', auth, async (req, res) => {
  try {
    const existingContact = await Contact.findOne({ user: req.user._id });
    if (existingContact) {
      return res.status(400).json({ message: 'Contact already exists' });
    }

    const contact = new Contact({
      ...req.body,
      user: req.user._id
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
});

// Update contact
router.put('/me', auth, async (req, res) => {
  try {
    const contact = await Contact.findOne({ user: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    Object.assign(contact, req.body);
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});

// Delete contact
router.delete('/me', auth, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ user: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

module.exports = router; 