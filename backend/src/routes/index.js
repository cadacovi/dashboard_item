const express = require('express');
const authRoutes = require('./authRoutes');
const itemRoutes = require('./itemRoutes');

const router = express.Router();

// Rutas de la API
router.use('/auth', authRoutes);
router.use('/items', itemRoutes);

// Ruta de health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
