'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProveedorSchema = Schema({
	nombre: String,
	descripcion: String,
	image: String
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);