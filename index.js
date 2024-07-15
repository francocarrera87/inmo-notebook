const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión establecida con MongoDB.'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios
app.use(express.static(path.join(__dirname, 'public'))); // Middleware para servir archivos estáticos

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');


//imagenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const inmobiliariaRouter = require('./routes/inmobiliaria');
const createRouter = require('./routes/create');
const listRouter = require('./routes/list');

app.use('/inmobiliaria', inmobiliariaRouter);
app.use('/create', createRouter);
app.use('/list', listRouter);

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
