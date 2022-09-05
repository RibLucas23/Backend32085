/* ---------------------- Modulos ----------------------*/
const express = require('express');
const morgan = require('morgan');

//Instancia de Server
const app = express();
const routerProductos = require('./src/routes/productos.routes.js');

/* ---------------------- Middlewares ---------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

/* ---------------------- Rutas ----------------------*/
app.use('/api/mascotas', routerMascotas);
app.use('/api/personas', routerPersonas);

/* ---------------------- Servidor ----------------------*/
const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', error => {
    console.error(`Error en el servidor ${error}`);
});
