'use strict'

var fs = require('fs');
var path = require('path');

var mongoosePaginate = require('mongoose-pagination');

var Proveedor = require('../models/proveedor');
var Servicio = require('../models/servicio');
var Personal = require('../models/personal');

function getPersonal(req, res){
	var personalId = req.params.id;

	Personal.findById(personalId).populate({path: 'servicio'}).exec((err, personal) => {
		if (err) {
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if (!personal) {
				res.status(404).send({message: 'El Personal no existe.'});
			}else{
				res.status(200).send({personal});
			}
		}
	});
}

function getPersonales(req, res){
	var servicioId = req.params.servicio;

	if (!servicioId) {
		var find = Personal.find({}).sort('nombre');
	}else{
		var find = Personal.find({servicio: servicioId}).sort('nombre');
	}

	find.populate({
		path: 'servicio',
		populate:{
			path: 'proveedor',
			model: 'Proveedor'
		}
	}).exec(function(err, personales){
		if (err) {
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if (!personales) {
				res.status(404).send({message: 'El hay personal para este Servicio.'});
			}else{
				res.status(200).send({personales});
			}
		}
	});
}

function savePersonal(req, res){
	var personal = new Personal();
	var params = req.body;

	personal.nombre = params.nombre;
	personal.domicilio = params.domicilio;
	personal.telefono = params.telefono;
	personal.image = 'null';
	personal.servicio = params.servicio;

	personal.save((err, personalStored) => {
		if (err) {
			res.status(500).send({message: 'Error al guardar el Personal.'});
		}else{
			if (!personalStored) {
				res.status(404).send({message: 'El Personal no ha sido guardado.'});
			}else{
				res.status(200).send({personal: personalStored});
			}
		}
	});
}

function updatePersonal(req, res){
	var personalId = req.params.id;
	var update = req.body;

	Personal.findByIdAndUpdate(personalId, update, (err, personalUpdated) =>{
		if (err) {
			res.status(500).send({message: 'Error en el servidor.'});
		}else{
			if (!personalUpdated) {
				res.status(404).send({message: 'El Personal no ha sido actualizado.'});
			}else{
				res.status(200).send({personal: personalUpdated});
			}
		}
	});
}

function deletePersonal(req, res){
	var personalId = req.params.id;

	Personal.findByIdAndRemove(personalId, (err, personalRemoved) => {
		if (err) {
			res.status(500).send({message: 'Error en el servidor.'});
		}else{
			if (!personalRemoved) {
				res.status(404).send({message: 'El Personal no ha sido eliminado.'});
			}else{
				res.status(200).send({personal: personalRemoved});
			}
		}
	});
}

module.exports = {
	getPersonal,
	savePersonal,
	getPersonales,
	updatePersonal,
	deletePersonal
};