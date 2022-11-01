import { carritosDaos, productosDaos } from "../../DAOs/index.js";

// Ver todos los productos
const getAll = async (req, res, next) => {
    try {
        const carritosAll = await carritosDaos.getAll()
        res.status(200).send(carritosAll);
    } catch (error) {
        next(error);
    }
}

// Ver por id
const getById = async (req, res, next) => {
    try {
        const carrito = await carritosDaos.getById(req.params.id)
        res.status(200).send(carrito);
    } catch (error) {
        next(error);
    }
}

// Actualizar por id
const update = async (req, res, next) => {
    try {
        const actualizar = await carritosDaos.update(req.params.id, req.body)
        res.status(200).send(actualizar);
    } catch (error) {
        next(error);
    }
}

//agregar producto al carro  (actualizar carrito)  
const addProduct = async (req, res, next) => {
    try {
        const producto = await productosDaos.getById(req.body.ID)
        const agregado = await carritosDaos.agregarAlCarro(producto, req.params.id)

        res.status(200).send(agregado);
    } catch (error) {
        next(error);
    }
}

// Eliminar por id
const remove = async (req, res, next) => {
    try {
        await carritosDaos.remove(req.params.id)
        res.status(202).send('Producto Eliminado con exito')
    } catch (error) {
        next(error);
    }
}
// Crear carrito nuevo
const create = async (req, res, next) => {
    try {
        const agregar = await carritosDaos.crearCarrito()
        res.status(200).send(agregar);
    } catch (error) {
        next(error);
    }
}



export { getAll, getById, create, update, remove, addProduct };
