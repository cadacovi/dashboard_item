const config = require('../config/config');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de validacion de Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Error de validacion',
      errors
    });
  }

  // Error de duplicado de Mongoose (email unico)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `El ${field} ya esta en uso`
    });
  }

  // Error de CastError (ID invalido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID invalido'
    });
  }

  // Errores personalizados
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.nodeEnv === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
