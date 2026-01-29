const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log(`MongoDB conectado en: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
