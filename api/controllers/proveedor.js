'use strict'

var fs = require('fs');
var path = require('path');

var mongoosePaginate = require('mongoose-pagination');

var Proveedor = require('../models/proveedor');
var Servicio = require('../models/servicio');
var Personal = require('../models/personal');

function getProveedor(req, res){
	var proveedorId = req.params.id;

	Proveedor.findById(proveedorId, (err, proveedor) => {
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!proveedor){
				res.status(404).send({message: 'El Proveedor no existe.'});
			}else{
				res.status(200).send({proveedor});
			}
		}
	});
}

function getProveedores(req, res){
	if (req.params.page) {
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 3;

	Proveedor.find().sort('nombre').paginate(page, itemsPerPage, function(err, proveedores, total){
		if (err) {
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!proveedores){
				res.status(404).send({message: 'No hay Proveedores.'});
			}else{
				return res.status(200).send({
					total_items: total,
					proveedores: proveedores
				});
			}
		}

	});
}

function saveProveedor(req, res){
	var proveedor = new Proveedor();

	var params = req.body;

	proveedor.nombre = params.nombre;
	proveedor.descripcion = params.descripcion;
	proveedor.image = 'null';

	proveedor.save((err, proveedorStored) => {
		if (err) {
			res.status(500).send({message: 'Error al guardar el Proveedor'});
		}else{
			if (!proveedorStored) {
				res.status(404).send({message: 'El Proveedor no ha sido guardado.'});
			}else{
				res.status(200).send({proveedor: proveedorStored});
			}
		}
	});
}

function updateProveedor(req, res){
	var proveedorId = req.params.id;
	var update = req.body;

	Proveedor.findByIdAndUpdate(proveedorId, update, (err, proveedorUpdated) => {
		if (err) {
			res.status(500).send({message: 'Error al guardar el Proveedor'});
		}else{
			if (!proveedorUpdated) {
				res.status(404).send({message: 'El Proveedor no ha sido actualizado.'});
			}else{
				res.status(200).send({proveedor: proveedorUpdated});
			}
		}
	});
}

function deleteProveedor(req, res){
	var proveedorId = req.params.id;

	Proveedor.findByIdAndRemove(proveedorId, (err, proveedorRemoved) =>{
		if (err) {
			res.status(500).send({message: 'Error al Eliminar el Proveedor'});
		}else{
			if (!proveedorRemoved) {
				res.status(404).send({message: 'El Proveedor no ha sido Eliminado.'});
			}else{
				Servicio.find({proveedor: proveedorRemoved._id}).remove((err, servicioRemoved)=>{
					if (err) {
						res.status(500).send({message: 'Error al Eliminar el Proveedor'});
					}else{
						if (!proveedorRemoved) {
							res.status(404).send({message: 'El Proveedor no ha sido Eliminado.'});
						}else{

							Personal.find({servicio: servicioRemoved._id}).remove((err, personalRemoved)=>{
								if (err) {
									res.status(500).send({message: 'Error al Personal el Proveedor'});
								}else{
									if (!personalRemoved) {
										res.status(404).send({message: 'El Personal no ha sido Eliminado.'});
									}else{
										res.status(200).send({proveedor: proveedorRemoved});
									}
								}
							});
						}
					}
				});
			}
		}
	});
}

function uploadImage(req, res){
	var proveedorId = req.params.id;
	var file_name = 'No subido...';

	if (req.files) {
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		var file_name = file_split[2];

		var ext_split = file_name.split('.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'gif') {
			Proveedor.findByIdAndUpdate(proveedorId, {image: file_name}, (err, proveedorUpdated) =>{
				if (!proveedorUpdated) {
					res.status(404).send({message: 'No se ha podido actualizar el Proveedor.'});
				}else{
					res.status(200).send({proveedor: proveedorUpdated});
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
	var path_file = './uploads/proveedor/'+imageFile;

	fs.exists(path_file, function(exists){
		if (exists) {
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

module.exports = {
	getProveedor,
	saveProveedor,
	getProveedores,
	updateProveedor,
	deleteProveedor,
	uploadImage,
	getImageFile
}