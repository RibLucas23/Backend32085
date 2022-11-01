import { Router } from "express";
const carritoRouter = Router()
import {
    getAll,
    getById,
    create,
    update,
    remove,
    addProduct
} from '../controllers/carritos/Carritos_controller.js';

// // Ver todos los carritos
carritoRouter.get('/', getAll);

// // Ver por id
carritoRouter.get('/:id', getById);

// // Crear nuevo carrito
carritoRouter.post('/', create);

// // Agrego prod al carrito
carritoRouter.post('/:id', addProduct);

// // Actualizar por id
carritoRouter.put('/:id', update);

// // Eliminar por id
carritoRouter.delete('/:id', remove);





export default carritoRouter