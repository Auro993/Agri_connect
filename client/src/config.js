// config.js
const config = {
  development: {
    API_URL: 'http://localhost:5001'
  },
  production: {
    API_URL: 'https://agriconnect-api-60av.onrender.com'
  }
};

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';
export default config[environment];