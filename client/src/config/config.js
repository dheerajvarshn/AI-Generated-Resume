/**
 * Global configuration for the application
 */

const config = {
  // API URL - change this when deploying to production
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://resume-portfolio-backend.onrender.com/api',
  
  // Default timeout for API requests in milliseconds
  apiTimeout: 30000,
  
  // Application name
  appName: 'Portfolio Dashboard',
  
  // Default items per page for paginated results
  defaultPageSize: 10
};

export default config; 