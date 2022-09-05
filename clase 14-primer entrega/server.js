/* ---------------------- Modulos ----------------------*/
let express = require('express');
const morgan = require('morgan');
//clases productos
const ProductosClass = require('./src/productos');
const objetos = new ProductosClass('./src/productos.json');


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
app.use('/productos', routerProductos);

// app.get('/', (req, res) => {
//     res.render('index')
// });
app.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.traerProductos();
    res.render('productos', { DB_PRODUCTOS });
})



//Errores GLobales
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send("Error en el servidor");
});





/* ---------------------- Servidor ----------------------*/
const server = app.listen(8080, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});
