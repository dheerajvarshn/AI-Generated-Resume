# Resume Portfolio Backend

This is the backend server for the Resume Portfolio website, built with Express.js, TypeScript, and MongoDB.

## Features

- RESTful API endpoints for resume data
- JWT authentication
- File upload handling
- MongoDB database integration
- TypeScript support
- Error handling middleware
- Admin and user roles

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Update the `.env` file with your configuration

## Development

To start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resume
- `GET /api/resume` - Get all resumes
- `GET /api/resume/:id` - Get single resume
- `POST /api/resume` - Create new resume (admin only)
- `PUT /api/resume/:id` - Update resume (admin only)
- `DELETE /api/resume/:id` - Delete resume (admin only)
- `GET /api/resume/:id/versions` - Get resume versions (admin only)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

## Testing

To run tests:

```bash
npm test
```

## Production

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Security

- JWT authentication
- Password hashing with bcrypt
- CORS configuration
- File upload validation
- Input sanitization
- Rate limiting

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 