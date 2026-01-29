const mongoose = require('mongoose');
const config = require('./config');

// Variable para cachear la conexion (importante para serverless)
let cachedConnection = null;

const connectDB = async () => {
  // Si ya hay una conexion activa, reutilizarla
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Usando conexion MongoDB existente');
    return cachedConnection;
  }

  try {
    // Opciones optimizadas para serverless
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    await mongoose.connect(config.mongodbUri, options);
    cachedConnection = mongoose.connection;
    console.log(`MongoDB conectado en: ${mongoose.connection.host}`);
    return cachedConnection;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    // En serverless, no queremos exit(1), mejor lanzar error
    if (config.nodeEnv === 'production') {
      throw error;
    }
    process.exit(1);
  }
};

module.exports = connectDB;
