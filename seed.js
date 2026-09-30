// Carga películas de ejemplo: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const Pelicula = require('./models/Pelicula');

const MONGO_URI = process.env.MONGO_URI ;

const peliculas = [
  {
    titulo: 'El Padrino',
    director: 'Francis Ford Coppola',
    anio: 1972,
    genero: ['Crimen', 'Drama'],
    duracion: 175,
    calificacion: 9.2,
    sinopsis: 'La saga de una familia mafiosa y el traspaso del poder al hijo menor.',
    reparto: ['Marlon Brando', 'Al Pacino', 'James Caan'],
  },
  {
    titulo: 'Interestelar',
    director: 'Christopher Nolan',
    anio: 2014,
    genero: ['Ciencia ficción', 'Drama'],
    duracion: 169,
    calificacion: 8.7,
    sinopsis: 'Un grupo de astronautas viaja por un agujero de gusano para salvar a la humanidad.',
    reparto: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
  },
  {
    titulo: 'Parásitos',
    director: 'Bong Joon-ho',
    anio: 2019,
    genero: ['Thriller', 'Drama'],
    duracion: 132,
    calificacion: 8.5,
    sinopsis: 'Una familia pobre se infiltra poco a poco en la vida de una familia adinerada.',
    reparto: ['Song Kang-ho', 'Choi Woo-shik', 'Park So-dam'],
  },
  {
    titulo: 'Matrix',
    director: 'Lana y Lilly Wachowski',
    anio: 1999,
    genero: ['Ciencia ficción', 'Acción'],
    duracion: 136,
    calificacion: 8.7,
    sinopsis: 'Un hacker descubre que la realidad que conoce es una simulación.',
    reparto: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
  },
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Pelicula.deleteMany({});
    await Pelicula.insertMany(peliculas);
    console.log(` ${peliculas.length} películas insertadas`);
  } catch (err) {
    console.error(' Error en el seed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
