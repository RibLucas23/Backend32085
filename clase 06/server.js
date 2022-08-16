let { request, response } = require('express');
const fs = require('fs/promises');

let express = require('express');
let Productos = require('./src/productos');
let app = express();
const productos = new Productos('./src/productos.json');

console.log(productos);
app.get('/', (request, response) => {
    response.send('Hola mundo');
});

app.get('/productos', async (request, response) => {
    const productosAll = await productos.traerProductos();
    response.send(productosAll);
});
app.get('/productosRandom', async (request, response) => {
    const objetoRandom = await productos.productoRandom();
    response.send(objetoRandom);
});


const server = app.listen(8080, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});
