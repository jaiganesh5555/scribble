// Environment-aware configuration
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Use local backend URL in development, production URL otherwise
export const BACKEND_URL = isDevelopment 
  ? "http://127.0.0.1:8787"
  : "https://backend.gjai8587.workers.dev"; 