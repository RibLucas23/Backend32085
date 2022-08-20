// ----------------------------------- MODULOS -------------------------
const express = require('express');
let Productos = require('./src/productos');
const objetos = new Productos('./src/productos.json');


// ----------------------------------- Instancia Server -------------------------

const app = express();

// ----------------------------------- Middlewares -------------------------
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');



// ----------------------------------- Rutas -------------------------

app.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.traerProductos();
    res.render('index', { DB_PRODUCTOS })
});

app.post('/productos', async (req, res) => {
    const DB_PRODUCTOS = await objetos.traerProductos();
    const producto = req.body;
    producto.id = DB_PRODUCTOS.length + 1;
    DB_PRODUCTOS.push(producto);
    console.log(DB_PRODUCTOS);
    res.redirect('/');
});

app.post('/eliminar', async (req, res) => {
    const DB_PRODUCTOS = await objetos.traerProductos();
    DB_PRODUCTOS = []
    res.redirect('/');
});

// ----------------------------------- Server -------------------------

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
})
server.on('error', (err) => {
    console.log(err);
})