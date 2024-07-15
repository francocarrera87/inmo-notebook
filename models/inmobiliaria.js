const mongoose = require('mongoose');

const inmobiliariaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  modo: {
    type: String,
    required: true,
    enum: ['venta', 'alquiler']
  },
  precio: {
    type: Number,
    required: true,
    min: 1000,
    max: 10000000
  },
  moneda: {
    type: String,
    required: true,
    enum: ['ARS', 'USD']
  },
  descripcion: {
    type: String,
    required: true
  },
  banos: {
    type: Number,
    required: true,
    min: 1
  },
  habitaciones: {
    type: Number,
    required: true,
    min: 1
  },
  metrosCuadrados: {
    type: Number,
    required: true,
    min: 1,
    max: 2000000
  },
  garajes: {
    type: Number,
    required: true,
    min: 0
  },
  pisos: {
    type: Number,
    required: true,
    min: 1
  },
  imagenes: {
    type: [String],
    required: true
  },
  metrosTotales: { // Nuevo campo
    type: Number,
    required: true,
    min: 1
  },
  ciudad: { // Nuevo campo
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Inmobiliaria', inmobiliariaSchema);
