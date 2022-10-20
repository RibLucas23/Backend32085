import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";

class CarritosDAOsFirebase extends ContenedorFirebase {

    constructor() {
        super("carritos")
    }

    // CREAR CARRO 
    async crearCarrito() {
        let fecha = new Date().toLocaleString()

        try {
            let carritoNew = {
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


    // AGREGAR AL CARRO
    async agregarAlCarro(producto, id) {
        let fecha = new Date()
        fecha = fecha.toLocaleString()
        let carrito = await this.getById(id)
        if (!carrito) {
            const error = `no hay carrito con  ID: ${id} `
            error.status = 404
            throw new Error(error)
        }
        producto = {
            ...producto,
            FECHA: fecha
        }

        carrito.PRODUCTOS.push(producto)
        await this.update(id, carrito)
        return super.carrito
    }
}
export default CarritosDAOsFirebase