'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServicioSchema = Schema({
	nombre: String,
	descripcion: String,
	image: String,
	proveedor: { type: Schema.ObjectId, ref: 'Proveedor'}
});

module.exports = mongoose.model('Servicio', ServicioSchema);