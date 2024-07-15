const express = require('express');
const router = express.Router();
const Inmobiliaria = require('../models/inmobiliaria');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Puedes configurar la ubicación y el nombre de archivo según sea necesario

// Crear un nuevo elemento inmobiliario
router.post('/', upload.array('imagenes', 10), async (req, res) => {
  try {
    const { nombre, modo, precio, moneda, descripcion, banos, habitaciones, metrosCuadrados, garajes, pisos, metrosTotales, ciudad } = req.body;
    const imagenes = req.files.map(file => file.path); // Guardar las rutas de las imágenes

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
      metrosTotales, // Nuevo campo
      ciudad, // Nuevo campo
      imagenes
    });

    const resultado = await nuevoElemento.save();
    res.status(201).json(resultado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los elementos inmobiliarios
router.get('/', async (req, res) => {
  try {
    const elementos = await Inmobiliaria.find();
    res.json(elementos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un elemento inmobiliario por ID
router.get('/:id', async (req, res) => {
  try {
    const elemento = await Inmobiliaria.findById(req.params.id);
    if (elemento == null) {
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
      metrosTotales, // Nuevo campo
      ciudad // Nuevo campo
    };

    // Si hay nuevas imágenes, actualizar las rutas de las imágenes
    if (req.files && req.files.length > 0) {
      const imagenes = req.files.map(file => file.path);
      updateData.imagenes = imagenes;
    }

    const elemento = await Inmobiliaria.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (elemento == null) {
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
    const elemento = await Inmobiliaria.findByIdAndDelete(req.params.id);
    if (elemento == null) {
      return res.status(404).json({ message: 'Elemento no encontrado' });
    }
    res.json({ message: 'Elemento eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
