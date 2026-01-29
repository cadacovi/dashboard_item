const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No hay token de autenticacion, acceso denegado'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Obtener usuario
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token invalido, usuario no encontrado'
      });
    }

    // Agregar usuario a la request
    req.user = {
      id: user._id,
      email: user.email,
      name: user.name
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalido'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }
    next(error);
  }
};

module.exports = authMiddleware;
