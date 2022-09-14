/* ---------------------- Modulos ----------------------*/
let express = require('express');
const morgan = require('morgan');
//clases productos
const ProductosClass = require('./src/productos');
const objetos = new ProductosClass('./src/database/productos.json');


//Instancia de Server
const app = express();
const routerProductos = require("./src/routes/productos.routes");
const routerCarrito = require("./src/routes/carrito.routes");
const routerIndex = require("./src/routes/index.routes")

/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');




/* ---------------------- Rutas ----------------------*/
app.use("/", routerIndex)
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito)





//Errores GLobales
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ error: { status: error.status || 500, message: error.message || 'Internal Server Error.' } })
});




/* ---------------------- Servidor ----------------------*/
const server = app.listen(8080, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});
