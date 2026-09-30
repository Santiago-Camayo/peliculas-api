#  API de Películas

API REST con Node.js, Express y MongoDB (Mongoose).

## Estructura

```
controllers/   lógica de cada endpoint
models/        esquemas de Mongoose
routes/        definición de rutas
app.js         config de Express, middlewares y errores
index.js       conexión a Mongo y arranque del servidor
seed.js        datos de ejemplo
```

## Arranque

```bash
npm install
cp .env.example .env     
npm run seed            
npm run dev             
```

## Endpoints

| Método | Ruta                  | Qué hace                  |
| ------ | --------------------- | ------------------------- |
| GET    | /api/peliculas        | Lista (filtros y paginación) |
| GET    | /api/peliculas/:id    | Trae una película         |
| POST   | /api/peliculas        | Crea una película         |
| PUT    | /api/peliculas/:id    | Actualiza una película    |
| DELETE | /api/peliculas/:id    | Elimina una película      |

### Query params del listado

`genero`, `anio`, `director`, `q` (busca en el título), `sort` (ej. `-calificacion`), `page`, `limit`

### Ejemplos

```bash
curl "http://localhost:3000/api/peliculas?genero=Drama&sort=-calificacion"

curl -X POST http://localhost:3000/api/peliculas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Ciudad de Dios","director":"Fernando Meirelles","anio":2002,"genero":["Crimen","Drama"],"duracion":130,"calificacion":8.6}'
```
