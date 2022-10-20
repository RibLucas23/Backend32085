import ContenedorMemoria from "../../contenedores/contenedorMemoria.js";

class CarritoDaosMemoria extends ContenedorMemoria {

    constructor() {
        super([])
    }
    // CREAR CARRO 
    async crearCarrito() {
        let fecha = new Date()
        let id
        fecha = fecha.toLocaleString()
        let DB = await this.getAll()
        let ultimoID = DB.length

        if (ultimoID != undefined) {
            id = ultimoID + 1
        } else {
            id = 1
        }

        try {
            let carritoNew = {
                ID: id,
                FECHA: fecha,
                CODIGO: Math.random().toString(36).substr(2, 18),
                PRODUCTOS: []
            }
            return super.create(carritoNew)
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // AGREGAR PROD AL CARRO
    async agregarAlCarro(producto, id) {
        let fecha = new Date()
        fecha = fecha.toLocaleString()
        let carrito = await this.getById(id)
        if (!carrito) {
            const error = `no hay carrito con  ID: ${id} `
            throw new Error(error)
        }
        producto = {
            ...producto,
            FECHA: fecha
        }
        carrito.PRODUCTOS.push(producto)
        return super.carrito
    }


}

export default CarritoDaosMemoria