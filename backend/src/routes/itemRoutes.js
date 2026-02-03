const express = require('express');
const { body } = require('express-validator');
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas las rutas de items son protegidas
router.use(authMiddleware);

// Validaciones
const itemValidation = [
  body('title').trim().notEmpty().withMessage('El titulo es requerido'),
  body('description').trim().notEmpty().withMessage('La descripcion es requerida'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Estado invalido')
];

const itemUpdateValidation = [
  body('title').optional().trim().notEmpty().withMessage('El titulo no puede estar vacio'),
  body('description').optional().trim().notEmpty().withMessage('La descripcion no puede estar vacia'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Estado invalido')
];

// Rutas CRUD
router.post('/', itemValidation, itemController.createItem);
router.get('/', itemController.getUserItems);
router.get('/:id', itemController.getItem);
router.patch('/:id', itemUpdateValidation, itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
