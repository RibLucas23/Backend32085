const fs = require('fs/promises');
// const DB_PRODUCTOS = productosJson

class ProductosClass_webSocket {
    constructor(ruta) {
        this.ruta = ruta;
    }


    async traerProductos() {
        try {
            const DB_PRODUCTOS = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(DB_PRODUCTOS)
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
            const DB_PRODUCTOS = await fs.readFile(this.ruta, 'utf-8')
            const producto = await DB_PRODUCTOS.find(producto => producto.id == id)
            return producto
        }
        catch (error) {
            return [error]
        }
    }
    async eliminarProducto(id) {
        try {
            const DB_PRODUCTOS = await fs.readFile(this.ruta, 'utf-8')
            const producto = await DB_PRODUCTOS.find(producto => producto.id == id)
            const productoEliminado = await DB_PRODUCTOS.splice(DB_PRODUCTOS.indexOf(producto), 1)
            return productoEliminado
        }
        catch (error) {
            return [error]
        }
    }
    async agregarProducto(producto) {
        try {
            console.log("1")
            const DB_PRODUCTOS = await fs.readFile(this.ruta, 'utf-8')
            let ultimoProducto = JSON.parse(DB_PRODUCTOS)[JSON.parse(DB_PRODUCTOS).length - 1]
            producto.id = ultimoProducto.id + 1;
            let DB_PRODUCTOS_NEW = JSON.parse(DB_PRODUCTOS)
            DB_PRODUCTOS_NEW.push(producto)

            await fs.writeFile(this.ruta, JSON.stringify(DB_PRODUCTOS_NEW))
            return producto
        }
        catch (error) {
            return [error]
        }
    }
}


module.exports = ProductosClass_webSocket;
