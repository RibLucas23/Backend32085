const fs = require('fs/promises');
// const DB_PRODUCTOS = productosJson

class ProductosClass {
    constructor(ruta) {
        this.ruta = ruta;
    }

    //TRAE TODOS LOS OBJETOS DEL JSON
    async getAll() {
        try {
            const DB_PRODUCTOS = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(DB_PRODUCTOS)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    //TRAE PRODUCTO RANDOM
    async productoRandom() {
        try {
            const objetos = await fs.readFile(this.ruta, 'utf-8')
            const objetoRandom = JSON.parse(objetos)[Math.floor(Math.random() * JSON.parse(objetos).length)]
            return objetoRandom
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    //TRAE PRODUCTO POR ID
    async getById(id) {
        const DB_PRODUCTOS = await this.getAll()
        // console.log(DB_PRODUCTOS)
        try {
            const producto = await DB_PRODUCTOS.find(producto => producto.id == id)
            if (producto != undefined) {
                return producto
            } else {
                console.log(`No existe el objeto con id: ${id}`)
                throw new Error(error)
            }
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    //ELIMINA POR ID
    async eliminar(id) {
        const DB_PRODUCTOS = await this.getAll()
        try {
            const obj = DB_PRODUCTOS.find(obj => obj.id == id)
            if (obj == undefined) {
                console.log(`No existe el objeto con id ${id}`)
                throw new Error(error)
            } else {
                const DB_PRODUCTOS_NEW = DB_PRODUCTOS.filter(obj => obj.id != id)
                await fs.writeFile(this.ruta, JSON.stringify(DB_PRODUCTOS_NEW, null, 2))
                return obj, console.log(obj)
            }
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    //AGREGA UN PRODUCTO
    async agregarNuevo(producto) {
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
            console.log(error)
            throw new Error(error)
        }
    }

    //  Crear carrito nuevo
    async crearCarrito(carrito) {
        try {

            carrito.productos = []
            await this.agregarNuevo(carrito)
            return carrito
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // Agregar obj al carro
    async agregarProductoAlCarro(producto, id) {
        try {
            //fecha
            let fecha = new Date()
            let fyh = fecha.toLocaleString()
            //DATABASE CARRITOS
            const DB_CARRITO_ENTERO = await this.getAll()
            const DB_CARRITO = await this.getById(id)
            let ultimoProducto = DB_CARRITO.productos[DB_CARRITO.productos.length - 1]
            producto.fyh = fyh
            if (ultimoProducto != undefined) {
                producto.id = ultimoProducto.id + 1
            } else {
                producto.id = 1
            }
            producto.codigo = Math.random().toString(36).substr(2, 18)

            DB_CARRITO.productos.push(producto)
            const index = DB_CARRITO_ENTERO.findIndex(carrito => carrito.id == id)
            DB_CARRITO_ENTERO[index] = DB_CARRITO
            await fs.writeFile(this.ruta, JSON.stringify(DB_CARRITO_ENTERO))


            return producto
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // Eliminar obj del carro
    async eliminarProdCarro(idCarro, idProducto) {
        try {
            const DB_CARRITO = await this.getById(idCarro)
            const DB_CARRITO_ENTERO = await this.getAll()
            const carritoActualizado = DB_CARRITO.productos.filter(obj => obj.id != idProducto)
            console.log(carritoActualizado)

            const index = DB_CARRITO_ENTERO.findIndex(carrito => carrito.id == idCarro)
            DB_CARRITO_ENTERO[index].productos = carritoActualizado
            await fs.writeFile(this.ruta, JSON.stringify(DB_CARRITO_ENTERO))

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }

    }

}



module.exports = ProductosClass;
