'use strict'

var express = require('express');
var ProveedorController = require('../controllers/proveedor');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/proveedor'});

api.get('/proveedor/:id', md_auth.ensureAuth, ProveedorController.getProveedor);
api.post('/proveedor', md_auth.ensureAuth, ProveedorController.saveProveedor);
api.get('/proveedores/:page?', md_auth.ensureAuth, ProveedorController.getProveedores);
api.put('/proveedor/:id', md_auth.ensureAuth, ProveedorController.updateProveedor);
api.delete('/proveedor/:id', md_auth.ensureAuth, ProveedorController.deleteProveedor);
api.post('/upload-image-proveedor/:id', [md_auth.ensureAuth, md_upload], ProveedorController.uploadImage);
api.get('/get-image-proveedor/:imageFile', ProveedorController.getImageFile);

module.exports = api;