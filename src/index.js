const express = require('express');
const morgan = require('morgan'); /*Utilizado para ver el log de actividad que manda el navegador*/
const path = require('path');
const {mongoose} = require('./database');

const app = express();

//settings
app.set('port', process.env.PORT || 3000) /*toma puerto asignado o si no default toma el 3000*/

// Middlewares
app.use(morgan('dev'));  
app.use(express.json()); /*verifica que los datos enviados y recibidos sean tipo JSON*/

//Routes
app.use('/api/inventario',require('./routes/inventario.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'),() => {
	console.log(`server on port ${app.get('port')}`);
});