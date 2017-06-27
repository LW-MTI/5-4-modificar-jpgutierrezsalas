'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

// Conexión a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/promti', (err, res) => {
	if (err) {
		throw err;
	}else{
		console.log("La conexión a la Base de Datos está funcionando correctamente.");
		app.listen(port, function(){
			console.log("El servidor de la App está funcionando en http://localhost:"+port);
		});
	}
});
