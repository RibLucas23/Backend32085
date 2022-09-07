const fs = require('fs/promises');
// const DB_PRODUCTOS = productosJson

class ProductosClass {
    constructor(ruta) {
        this.ruta = ruta;
    }

    //TRAE TODOS LOS OBJETOS DEL JSON
    async traerProductos() {
        try {
            const DB_PRODUCTOS = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(DB_PRODUCTOS)
        } catch (error) {
            console.log(error)
            return []
        }
    }

    //TRAE PRODUCTO RANDOM
    async productoRandom() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            const objetoRandom = JSON.parse(objetos)[Math.floor(Math.random() * JSON.parse(objetos).length)]
            return objetoRandom
        } catch (error) {
            return []
        }
    }

    //TRAE PRODUCTO POR ID
    async productoPorId(id) {
        const DB_PRODUCTOS = await this.traerProductos()
        try {
            const producto = await DB_PRODUCTOS.find(producto => producto.id == id)
            if (producto != undefined) {
                return producto
            } else {
                console.log(`No existe el objeto con id: ${id}`)
            }
        }
        catch (error) {
            return [error]
        }
    }

    //ELIMINA POR ID
    async eliminarProducto(id) {
        const DB_PRODUCTOS = await this.traerProductos()
        try {
            const obj = DB_PRODUCTOS.find(obj => obj.id == id)
            if (obj == undefined) {
                console.log(`No existe el objeto con id ${id}`)
            } else {
                const DB_PRODUCTOS_NEW = DB_PRODUCTOS.filter(obj => obj.id != id)
                await fs.writeFile(this.ruta, JSON.stringify(DB_PRODUCTOS_NEW, null, 2))
                return obj, console.log(obj)
            }
        }
        catch (error) {
            return [error]
        }
    }

    //AGREGA UN PRODUCTO
    async agregarProducto(producto) {
        try {
            let fecha = new Date()
            let fyh = fecha.toLocaleString()
            const DB_PRODUCTOS = await fs.readFile(this.ruta, 'utf-8')
            let ultimoProducto = JSON.parse(DB_PRODUCTOS)[JSON.parse(DB_PRODUCTOS).length - 1]

            producto.id = ultimoProducto.id + 1;
            producto.fyh = fyh
            producto.codigo = Math.random().toString(36).substr(2, 18)

            let DB_PRODUCTOS_NEW = JSON.parse(DB_PRODUCTOS)
            DB_PRODUCTOS_NEW.push(producto)

            await fs.writeFile(this.ruta, JSON.stringify(DB_PRODUCTOS_NEW))
            return producto
        }
        catch (error) {
            return [error]
        }
    }

    async crearCarrito(carrito) {
        try {

            carrito.productos = []
            await this.agregarProducto(carrito)
            return carrito
        } catch (error) {
            return [error]
        }
    }

    // async agregarProductoAlCarro(id, producto) {
    //     let carrito = await this.productoPorId(id)
    //     carrito.productos = await this.agregarProducto(producto)
    //     return carrito
    // }


}


module.exports = ProductosClass;
