const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger simple para desarrollo
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Rutas
app.use('/api', routes);

// Ruta raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API MVC con Node.js y Express',
    version: '1.0.0'
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Exportar para Vercel (serverless) o desarrollo local
if (config.nodeEnv !== 'production') {
  // Solo iniciar servidor en desarrollo
  app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
    console.log(`Modo: ${config.nodeEnv}`);
  });
}

module.exports = app;
