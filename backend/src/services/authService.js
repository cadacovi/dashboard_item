const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const AppError = require('../utils/AppError');

class AuthService {
  // Generar JWT token
  generateToken(userId) {
    return jwt.sign({ id: userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    });
  }

  // Registrar nuevo usuario
  async register(userData) {
    const { name, email, password } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('El email ya esta registrado', 400);
    }

    // Crear usuario
    const user = await User.create({ name, email, password });

    // Generar token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  // Login de usuario
  async login(email, password) {
    // Buscar usuario con password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Credenciales invalidas', 401);
    }

    // Verificar password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Credenciales invalidas', 401);
    }

    // Generar token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  // Obtener perfil del usuario
  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}

module.exports = new AuthService();
