const express = require('express');
const router = express.Router();
const Inmobiliaria = require('../models/inmobiliaria');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' }); // Puedes configurar la ubicación y el nombre de archivo según sea necesario

// Middleware para asegurar que el usuario esté autenticado
const ensureAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Usuario no autenticado' });
  }
};

// Aplicar middleware de autenticación a todas las rutas
router.use(ensureAuthenticated);

// Crear un nuevo elemento inmobiliario
router.post('/', upload.array('imagenes', 10), async (req, res) => {
  try {
    const { nombre, modo, precio, moneda, descripcion, banos, habitaciones, metrosCuadrados, garajes, pisos, metrosTotales, ciudad } = req.body;
    const imagenes = req.files.map(file => path.join('/uploads', file.filename)); // Guardar las rutas de las imágenes

    const nuevoElemento = new Inmobiliaria({
      nombre,
      modo,
      precio,
      moneda,
      descripcion,
      banos,
      habitaciones,
      metrosCuadrados,
      garajes,
      pisos,
      metrosTotales,
      ciudad,
      imagenes,
      userId: req.session.userId // Asociar propiedad con el usuario logueado
    });

    const resultado = await nuevoElemento.save();
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los elementos inmobiliarios del usuario autenticado
router.get('/', async (req, res) => {
  try {
    const elementos = await Inmobiliaria.find({ userId: req.session.userId });
    res.json(elementos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un elemento inmobiliario por ID
router.get('/:id', async (req, res) => {
  try {
    const elemento = await Inmobiliaria.findOne({ _id: req.params.id, userId: req.session.userId });
    if (!elemento) {
      return res.status(404).json({ message: 'Elemento no encontrado' });
    }
    res.json(elemento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un elemento inmobiliario por ID
router.put('/:id', upload.array('imagenes', 10), async (req, res) => {
  try {
    const { nombre, modo, precio, moneda, descripcion, banos, habitaciones, metrosCuadrados, garajes, pisos, metrosTotales, ciudad } = req.body;
    let updateData = {
      nombre,
      modo,
      precio,
      moneda,
      descripcion,
      banos,
      habitaciones,
      metrosCuadrados,
      garajes,
      pisos,
      metrosTotales,
      ciudad
    };

    if (req.files && req.files.length > 0) {
      const imagenes = req.files.map(file => path.join('/uploads', file.filename));
      updateData.imagenes = imagenes;
    }

    const elemento = await Inmobiliaria.findOneAndUpdate({ _id: req.params.id, userId: req.session.userId }, updateData, { new: true });
    if (!elemento) {
      return res.status(404).json({ message: 'Elemento no encontrado' });
    }
    res.json(elemento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un elemento inmobiliario por ID
router.delete('/:id', async (req, res) => {
  try {
    const elemento = await Inmobiliaria.findOneAndDelete({ _id: req.params.id, userId: req.session.userId });
    if (!elemento) {
      return res.status(404).json({ message: 'Elemento no encontrado' });
    }
    res.json({ message: 'Elemento eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
