const express = require('express');
const router = express.Router();
const {
  listarPeliculas,
  obtenerPelicula,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula,
} = require('../controllers/peliculaController');

router.get('/', listarPeliculas);
router.get('/:id', obtenerPelicula);
router.post('/', crearPelicula);
router.put('/:id', actualizarPelicula);
router.delete('/:id', eliminarPelicula);

module.exports = router;
