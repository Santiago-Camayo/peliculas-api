const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      maxlength: [150, 'El título no puede superar 150 caracteres'],
    },
    director: {
      type: String,
      required: [true, 'El director es obligatorio'],
      trim: true,
    },
    anio: {
      type: Number,
      required: [true, 'El año es obligatorio'],
      min: [1888, 'El año no puede ser anterior a 1888'],
      max: [new Date().getFullYear() + 5, 'El año es demasiado futuro'],
    },
    genero: {
      type: [String],
      default: [],
    },
    duracion: {
      type: Number, // en minutos
      min: [1, 'La duración debe ser mayor a 0'],
    },
    calificacion: {
      type: Number,
      min: [0, 'La calificación mínima es 0'],
      max: [10, 'La calificación máxima es 10'],
    },
    sinopsis: {
      type: String,
      trim: true,
    },
    reparto: {
      type: [String],
      default: [],
    },
    poster: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Evita duplicados exactos (mismo título y año)
peliculaSchema.index({ titulo: 1, anio: 1 }, { unique: true });

module.exports = mongoose.model('Pelicula', peliculaSchema);
