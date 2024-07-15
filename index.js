const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mysecret', // Cambia esto por una cadena secreta segura en producción
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');

const inmobiliariaRouter = require('./routes/inmobiliaria');
const createRouter = require('./routes/create');
const listRouter = require('./routes/list');
const authRouter = require('./routes/auth');

app.use('/inmobiliaria', inmobiliariaRouter);
app.use('/create', createRouter);
app.use('/list', listRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Ruta para el formulario de inicio de sesión
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta para el formulario de registro
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
