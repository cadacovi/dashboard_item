const { validationResult } = require('express-validator');
const authService = require('../services/authService');

class AuthController {
  // Registrar usuario
  async register(req, res, next) {
    try {
      // Validar errores
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const result = await authService.register(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // Login de usuario
  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener perfil (ruta protegida)
  async getProfile(req, res, next) {
    try {
      const profile = await authService.getProfile(req.user.id);
      
      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
