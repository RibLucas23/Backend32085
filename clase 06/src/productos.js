let productosJson = require('./productos.json');

class Productos {
    constructor() { }

    traerProductos() {
        return productosJson;
    }
    productoRandom() {
        return productosJson[Math.floor(Math.random() * productosJson.length)];
    }
}

module.exports = Productos;
