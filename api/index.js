// api/index.js - Funcion serverless para Vercel
const app = require('../backend/src/server');
const connectDB = require('../backend/src/config/database');

// Handler para Vercel Serverless - asegura la conexión antes de procesar
let isConnected = false;

module.exports = async (req, res) => {
  // Conectar a MongoDB si no está conectado
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error('Error conectando a MongoDB:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error de conexión a la base de datos' 
      });
    }
  }

  // Procesar request con Express
  return app(req, res);
};