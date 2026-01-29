const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard_db',
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};

module.exports = config;
