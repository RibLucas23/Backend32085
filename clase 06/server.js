let { request, response } = require('express');
let express = require('express');
let Productos = require('./src/productos');
let app = express();
const productos = new Productos();

console.log(productos);
app.get('/', (request, response) => {
    response.send('Hola mundo');
});

app.get('/productos', (request, response) => {
    response.send(productos.traerProductos());
});
app.get('/productosRandom', (request, response) => {
    response.send(productos.productoRandom());
});


const server = app.listen(8080, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});
