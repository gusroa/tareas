const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// conectando DB 
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('db conectada'))
    .catch(err => console.log('Error al conectar con la base de datos'));

// import routes
const indexRoutes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares (es una funcion que se ejecuta antes de las rutas)  
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));  

// routes
app.use('/', indexRoutes);


// iniciando el seridor 
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

