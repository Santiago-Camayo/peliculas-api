const mongoose = require('mongoose');
const Pelicula = require('../models/Pelicula');

const escaparRegex = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const CAMPOS_ORDENABLES = ['titulo', 'anio', 'calificacion', 'duracion', 'createdAt'];


exports.listarPeliculas = async (req, res, next) => {
  try {
    const { genero, anio, director, q, sort = '-createdAt' } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);

    const filtro = {};
    if (genero) filtro.genero = new RegExp(`^${escaparRegex(genero)}$`, 'i');
    if (anio) filtro.anio = Number(anio);
    if (director) filtro.director = new RegExp(escaparRegex(director), 'i');
    if (q) filtro.titulo = new RegExp(escaparRegex(q), 'i');

    const campo = sort.replace('-', '');
    const orden = CAMPOS_ORDENABLES.includes(campo) ? sort : '-createdAt';

    const [peliculas, total] = await Promise.all([
      Pelicula.find(filtro)
        .sort(orden)
        .skip((page - 1) * limit)
        .limit(limit),
      Pelicula.countDocuments(filtro),
    ]);

    res.json({
      total,
      pagina: page,
      paginas: Math.ceil(total / limit),
      resultados: peliculas,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/peliculas/:id
exports.obtenerPelicula = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const pelicula = await Pelicula.findById(id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(pelicula);
  } catch (err) {
    next(err);
  }
};

// POST /api/peliculas
exports.crearPelicula = async (req, res, next) => {
  try {
    const pelicula = await Pelicula.create(req.body);
    res.status(201).json(pelicula);
  } catch (err) {
    next(err);
  }
};

// PUT /api/peliculas/:id
exports.actualizarPelicula = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const pelicula = await Pelicula.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(pelicula);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/peliculas/:id
exports.eliminarPelicula = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const pelicula = await Pelicula.findByIdAndDelete(id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json({ mensaje: 'Película eliminada', pelicula });
  } catch (err) {
    next(err);
  }
};
