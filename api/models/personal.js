'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonalSchema = Schema({
	nombre: String,
	domicilio: String,
	telefono: String,
	image: String,
	servicio: { type: Schema.ObjectId, ref: 'Servicio'}
});

module.exports = mongoose.model('Personal', PersonalSchema);