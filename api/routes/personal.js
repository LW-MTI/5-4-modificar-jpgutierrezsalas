'use strict'

var express = require('express');
var PersonalController = require('../controllers/personal');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/personal'});

api.get('/personal/:id', md_auth.ensureAuth, PersonalController.getPersonal);
api.post('/personal', md_auth.ensureAuth, PersonalController.savePersonal);
api.get('/personales/:servicio?', md_auth.ensureAuth, PersonalController.getPersonales);
api.put('/personal/:id', md_auth.ensureAuth, PersonalController.updatePersonal);
api.delete('/personal/:id', md_auth.ensureAuth, PersonalController.deletePersonal);

module.exports = api;