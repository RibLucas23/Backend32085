const fs = require('fs/promises');

let productosJson = require('./productos.json');

class Productos {
    constructor(ruta) {
        this.ruta = ruta;
    }


    async traerProductos() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objetos)
        } catch (error) {
            return []
        }
    }
    async productoRandom() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            const objetoRandom = JSON.parse(objetos)[Math.floor(Math.random() * JSON.parse(objetos).length)]
            return objetoRandom
        } catch (error) {
            return []
        }
    }
}


module.exports = Productos;
