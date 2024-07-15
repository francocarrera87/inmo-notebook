const mongoose = require('mongoose');

const inmobiliariaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  modo: { type: String, required: true },
  precio: { type: Number, required: true },
  moneda: { type: String, required: true },
  descripcion: { type: String, required: true },
  banos: { type: Number, required: true },
  habitaciones: { type: Number, required: true },
  metrosCuadrados: { type: Number, required: true },
  garajes: { type: Number, required: true },
  pisos: { type: Number, required: true },
  metrosTotales: { type: Number, required: true },
  ciudad: { type: String, required: true },
  imagenes: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Asociar propiedad con usuario
});

module.exports = mongoose.model('Inmobiliaria', inmobiliariaSchema);
