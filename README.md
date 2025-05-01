# Resume Portfolio Application

This is a full-stack application for a resume/portfolio website built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Personal information display
- Education history
- Professional experience
- Skills with ratings
- Projects showcase
- Contact form for visitors

## Project Structure

- `backend/` - Node.js/Express API
- `client/` - React frontend application

## Simplified Data Model

This application uses a consolidated data model where all information is stored in a single `User` collection:

- User authentication (email, password, role)
- Personal information (name, title, summary, social links)
- Education history
- Work experience
- Skills
- Projects
- Contact messages

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/resume-portfolio.git
cd resume-portfolio
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

### Configuration

1. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

1. Start MongoDB (if using local instance)
```bash
mongod
```

2. Seed the database with initial data
```bash
cd backend
npm run seed
```

3. Start the backend server
```bash
npm run dev
```

4. In a new terminal, start the frontend
```bash
cd ../client
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current authenticated user

### User Data
- `GET /api/user` - Get all user data
- `PUT /api/user` - Update user data
- `POST /api/user/contact` - Submit a contact form
- `PUT /api/user/projects` - Update projects section
- `PUT /api/user/experience` - Update experience section
- `PUT /api/user/skills` - Update skills section

## Technologies Used

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React
- Next.js
- Axios for API calls
- Material-UI for styling

## Development

The application has been converted from TypeScript to JavaScript for easier development. 