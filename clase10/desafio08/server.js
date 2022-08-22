/* ---------------------- Modulos ----------------------*/
let express = require('express');
const morgan = require('morgan');


//Instancia de Server
const app = express();
const routerProductos = require("./src/routes/productos.routes");
/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');


/* ---------------------- Rutas ----------------------*/
app.use('/api/productos', routerProductos);


//Errores GLobales
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send("Error en el servidor");
});





/* ---------------------- Servidor ----------------------*/
const server = app.listen(8080, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});
