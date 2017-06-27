'use strict'

var fs = require('fs');
var path = require('path');

var mongoosePaginate = require('mongoose-pagination');

var Proveedor = require('../models/proveedor');
var Servicio = require('../models/servicio');
var Personal = require('../models/personal');

function getServicio(req, res){
	var servicioId =req.params.id;

	Servicio.findById(servicioId).populate({path: 'proveedor'}).exec((err, servicio) => {
		if (err) {
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if (!servicio) {
				res.status(404).send({message: 'No existe este Servicio.'});
			}else{
				res.status(200).send({servicio});
			}
		}
	});
}

function saveServicio(req, res){
	var servicio = new Servicio;

	var params = req.body;

	servicio.nombre = params.nombre;
	servicio.descripcion = params.descripcion;
	servicio.image = 'null';
	servicio.proveedor = params.proveedor;

	servicio.save((err, servicioStored) => {
		if (err) {
			res.status(500).send({message: 'Error al guardar el Servicio'});
		}else{
			if (!servicioStored) {
				res.status(404).send({message: 'El Servicio no ha sido guardado.'});
			}else{
				res.status(200).send({servicio: servicioStored});
			}
		}
	});
}

function getServicios(req, res){
	var proveedorId = req.params.proveedor;

	if (!proveedorId) {
		// Obtener todos los servicios de la BD
		var find = Servicio.find({}).sort('nombre');
	}else{
		// Obtener todos los servicios de un proveedor en especifico de la BD
		var find = Servicio.find({proveedor: proveedorId}).sort('nombre');
	}

	find.populate({path: 'proveedor'}).exec((err, servicios) => {
		if (err) {
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!servicios){
				res.status(404).send({message: 'No hay Servicios.'});
			}else{
				res.status(200).send({servicios});
			}
		}
	});
}

function updateServicio(req, res){
	var servicioId = req.params.id;
	var update = req.body;

	Servicio.findByIdAndUpdate(servicioId, update, (err, servicioUpdated) => {
		if (err) {
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!servicioUpdated){
				res.status(404).send({message: 'No se ha actualizado el Servicios.'});
			}else{
				res.status(200).send({servicio: servicioUpdated});
			}
		}
	});
}

function deleteServicio(req, res){
	var servicioId = req.params.id;
	
	Servicio.findById(servicioId).remove((err, servicioRemoved)=>{
		if (err) {
			res.status(500).send({message: 'Error al Eliminar el Servicio.'});
		}else{
			if (!servicioRemoved) {
				res.status(404).send({message: 'El Servicio no ha sido Eliminado.'});
			}else{
				Personal.find({servicio: servicioRemoved._id}).remove((err, personalRemoved)=>{
					if (err) {
						res.status(500).send({message: 'Error al Personal del Servicio'});
					}else{
						if (!personalRemoved) {
							res.status(404).send({message: 'El Personal no ha sido Eliminado.'});
						}else{
							res.status(200).send({servicio: servicioRemoved});
						}
					}
				});
			}
		}
	});
}

function uploadImage(req, res){
	var servicioId = req.params.id;
	var file_name = 'No subido...';

	if (req.files) {
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		var file_name = file_split[2];

		var ext_split = file_name.split('.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'gif') {
			Servicio.findByIdAndUpdate(servicioId, {image: file_name}, (err, servicioUpdated) =>{
				if (!servicioUpdated) {
					res.status(404).send({message: 'No se ha podido actualizar el Proveedor.'});
				}else{
					res.status(200).send({servicio: servicioUpdated});
				}
			});
		}else{
			res.status(200).send({message: 'Extensión del archivo no valida...'});
		}
		console.log(ext_split);
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/servicios/'+imageFile;

	fs.exists(path_file, function(exists){
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

module.exports = {
	getServicio,
	saveServicio,
	getServicios,
	updateServicio,
	deleteServicio,
	uploadImage,
	getImageFile
}











