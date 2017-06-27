'use strict'

var express = require('express');
var ServicioController = require('../controllers/servicio');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/servicios'});

api.get('/servicio/:id', md_auth.ensureAuth, ServicioController.getServicio);
api.post('/servicio', md_auth.ensureAuth, ServicioController.saveServicio);
api.get('/servicios/:proveedor?', md_auth.ensureAuth, ServicioController.getServicios);
api.put('/servicio/:id', md_auth.ensureAuth, ServicioController.updateServicio);
api.delete('/servicio/:id', md_auth.ensureAuth, ServicioController.deleteServicio);
api.post('/upload-image-servicio/:id', [md_auth.ensureAuth, md_upload], ServicioController.uploadImage);
api.get('/get-image-servicio/:imageFile', ServicioController.getImageFile);

module.exports = api;