const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

const initialData = {
  // User credentials
  email: "dheerajvarshn@gmail.com",
  password: "admin123",
  role: "admin",
  
  // Personal information
  name: "Dheeraj Varshney",
  title: "Full Stack Developer",
  summary: "I am a passionate Full Stack Developer with expertise in MERN stack and modern web technologies. I love building scalable applications and solving complex problems.",
  socialLinks: {
    linkedin: "https://linkedin.com/in/dheerajvarshn",
    github: "https://github.com/dheerajvarshn",
    twitter: "https://twitter.com/dheerajvarshn"
  },
  
  // Education history
  education: [
    {
      institution: "Bhim Rao Ambedkar University, Agra",
      degree: "Bachelor of Science(Computer Science)",
      field: "Computer Science",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2023-12-31")
    },
    {
      institution: "Khana Makhan Public School, Mathura",
      degree: "Intermediate",
      field: "Science",
      startDate: new Date("2018-01-01"),
      endDate: new Date("2020-12-31")
    }
  ],
  
  // Work experience
  experience: [
    {
      company: "Groot Software Solution",
      position: "Associate Software Developer",
      startDate: new Date("2024-02-05"),
      endDate: new Date("2024-12-28"),
      description: "At Groot Software Solution, I work as a MERN Stack Developer, where I build and maintain web applications using Next.js, React.js, Node.js, and MongoDB. I focus on developing dynamic dashboards, reusable components, API integrations, and user-friendly features for hospital management systems.",
      achievements: [
        "Developed dynamic dashboards for hospital management",
        "Created reusable components for better code maintainability",
        "Integrated various APIs for seamless functionality"
      ]
    }
  ],
  
  // Skills
  skills: [
    { name: "JavaScript", level: 90, category: "Programming" },
    { name: "React", level: 95, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "TypeScript", level: 75, category: "Programming" },
    { name: "MongoDB", level: 70, category: "Database" },
    { name: "Next.js", level: 95, category: "Frontend" },
    { name: "Express", level: 60, category: "Backend" },
    { name: "HTML", level: 55, category: "Frontend" },
    { name: "CSS", level: 50, category: "Frontend" },
    { name: "Git", level: 60, category: "Tools" },
    { name: "GitHub", level: 60, category: "Tools" }
  ],
  
  // Projects
  projects: [
    {
      title: "Bankey Bihari Collection",
      description: "A full-featured e-commerce platform for traditional Indian clothing and accessories. Built with modern web technologies and featuring secure payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      link: "https://github.com/dheerajvarshn/Bankey-Bihari-Collection",
      image: "/images/ecommerce.jpg"
    },
    {
      title: "MyTastyFood",
      description: "A responsive food delivery website with real-time order tracking and restaurant management features. Focused on user experience and performance optimization.",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
      link: "https://github.com/dheerajvarshn/myTastyFood",
      image: "/images/food-delivery.jpg"
    },
    {
      title: "Fitness App",
      description: "A comprehensive fitness application that provides exercise routines, nutrition tracking, and progress monitoring. Integrated with RapidAPI for exercise data.",
      technologies: ["React", "Material UI", "RapidAPI", "Firebase"],
      link: "https://github.com/dheerajvarshn/React-Fitness-App",
      image: "/images/fitness.jpg"
    },
    {
      title: "E-Hospital Management System",
      description: "A complete hospital management solution featuring patient records, appointment scheduling, inventory management, and staff coordination. Built with modern enterprise technologies.",
      technologies: ["Next.js", ".NET", "Redux Toolkit", "SQL Server", "Azure"],
      link: "https://github.com/dheerajvarshn/E-Hospital-Management-System",
      image: "/images/hospital.jpg"
    }
  ],
  
  // Contact messages
  contacts: [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      message: "Interested in your portfolio and would like to discuss potential collaboration."
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Great work on your projects! Looking forward to seeing more of your work."
    }
  ]
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    console.log('Cleared existing user data');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(initialData.password, salt);
    
    // Create a new user with all data
    const user = new User({
      ...initialData,
      password: hashedPassword
    });
    
    await user.save();
    console.log('Database seeded successfully with user data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 