const fs = require('fs/promises');
const productosJson = require("./productos.json");
const DB_PRODUCTOS = productosJson

class ProductosClass {
    constructor(ruta) {
        this.ruta = ruta;
    }


    async traerProductos() {
        try {
            return DB_PRODUCTOS
            // return JSON.parse(objetos)
        } catch (error) {
            console.log(error)
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
    async productoPorId(id) {
        try {
            const producto = await DB_PRODUCTOS.find(producto => producto.id == id)
            return producto
        }
        catch (error) {
            return [error]
        }
    }
    async eliminarProducto(id) {
        try {
            const producto = await DB_PRODUCTOS.find(producto => producto.id == id)
            const productoEliminado = await DB_PRODUCTOS.splice(DB_PRODUCTOS.indexOf(producto), 1)
            return productoEliminado
        }
        catch (error) {
            return [error]
        }
    }
}


module.exports = ProductosClass;
