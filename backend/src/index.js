const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4  // Force IPv4
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  // Check if users exist, if not, seed the database
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found. Running initial seed...');
      // Import seed data and function
      const initialData = require('./seed').initialData;
      const seedDatabase = require('./seed').seedDatabase;
      
      // Run seed function
      await seedDatabase();
      console.log('Database auto-seeded successfully!');
    } else {
      console.log(`Database already has ${userCount} users. Skipping auto-seed.`);
    }
  } catch (error) {
    console.error('Error during auto-seed check:', error);
  }
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  console.log('Connection string used (redacted):', 
    process.env.MONGODB_URI ? 
    process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 
    'Not provided');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Seed route with basic protection
app.post('/api/seed', (req, res) => {
  // Basic protection with a seed token
  const seedToken = process.env.SEED_TOKEN || 'default_seed_token';
  if (req.body.token !== seedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    // Import seed function
    const seedDatabase = require('./seed').seedDatabase;
    
    // Run seed function
    seedDatabase()
      .then(success => {
        if (success) {
          res.json({ message: 'Database seeded successfully!' });
        } else {
          res.status(500).json({ message: 'Error seeding database' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Error seeding database', error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Resume Portfolio API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying port ${PORT + 1}`);
    server.close();
    app.listen(PORT + 1, () => {
      console.log(`Server is running on port ${PORT + 1}`);
    });
  } else {
    console.error('Server error:', err);
  }
}); 