import { fakerProductsDAOs } from "../../DAOs/index.js";

// ******************************************************************//
//=============                    FS                    =============
// ******************************************************************//

// Ver todos los productos
const getAll = async (req, res, next) => {
    try {
        const productosAll = await fakerProductsDAOs.getAll()
        // res.status(200).render('productosHistorial', { productosAll });
        res.status(200).render('productosHistorial', { productosAll })
    } catch (error) {
        next(error);
    }
}

// Ver por id
const getById = async (req, res, next) => {
    try {
        const productosAll = await fakerProductsDAOs.getById(req.params.id)
        res.status(200).send(productosAll);
    } catch (error) {
        next(error);
    }
}

// Actualizar por id
const update = async (req, res, next) => {
    try {
        const actualizar = await fakerProductsDAOs.update(req.params.id, req.body)
        res.status(200).send(actualizar);
    } catch (error) {
        next(error);
    }
}

// Eliminar por id
const remove = async (req, res, next) => {
    try {
        await fakerProductsDAOs.remove(req.params.id)
        res.status(202).send('Producto Eliminado con exito')
    } catch (error) {
        next(error);
    }
}
// Agregar producto nuevo
const create = async (req, res, next) => {
    try {
        const agregar = await fakerProductsDAOs.crearMensaje()
        res.status(200).send(agregar);
    } catch (error) {
        next(error);
    }
}
export { getAll, getById, create, update, remove };
