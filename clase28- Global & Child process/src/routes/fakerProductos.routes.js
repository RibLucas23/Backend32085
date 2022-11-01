import { Router } from "express";
const fakerProductosRouter = Router()

import { getAll, getById, create, update, remove } from '../controllers/faker/fakerProds_controller.js';


// // Ver todos los productos
fakerProductosRouter.get('/', getAll);

// // Ver por id
fakerProductosRouter.get('/:id', getById);

// // Crear nuevo producto
fakerProductosRouter.post('/', create);

// // Actualizar por id
fakerProductosRouter.put('/:id', update);

// // Eliminar por id
fakerProductosRouter.delete('/:id', remove);





export default fakerProductosRouter