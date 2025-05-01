# Resume Portfolio Client

This is the frontend application for the Resume Portfolio website, built with Next.js, TypeScript, and Material UI.

## Features

- Modern, responsive design
- Dark/light mode support
- Interactive timeline for work experience
- Skills matrix with progress indicators
- Project showcase with modal details
- Contact form with validation
- Social media integration
- SEO optimization
- Accessibility compliance

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
5. Update the `.env.local` file with your configuration

## Development

To start the development server:

```bash
npm run dev
```

The application will start on `http://localhost:3000` by default.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── page.tsx        # Home page
│   ├── resume/         # Resume page
│   ├── projects/       # Projects page
│   └── contact/        # Contact page
├── components/         # Reusable components
├── providers/          # Context providers
├── theme/             # Material UI theme
└── utils/             # Utility functions
```

## Technologies Used

- Next.js 14
- TypeScript
- Material UI
- Framer Motion
- React Hook Form
- Zod
- SWR
- Jest
- React Testing Library

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 