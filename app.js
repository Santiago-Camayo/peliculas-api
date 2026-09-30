const express = require('express');
const cors = require('cors');
const peliculaRoutes = require('./routes/peliculaRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de películas funcionando ',
    endpoints: '/api/peliculas',
  });
});

// Rutas
app.use('/api/peliculas', peliculaRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const detalles = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: 'Datos inválidos', detalles });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Valor inválido para "${err.path}"` });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Ya existe una película con ese título y año' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON mal formado' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
