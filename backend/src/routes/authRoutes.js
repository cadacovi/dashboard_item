const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Validaciones
const registerValidation = [
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email invalido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email invalido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

// Rutas publicas
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);

// Rutas protegidas
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
