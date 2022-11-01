import { Router } from "express";
const productosRouter = Router()
//******************    CONTROLLERS    ******************//

//                      memoria
// import { getAll, getById, create, update, remove } from '../controllers/productos/memProductos_controller.js';

// Fs
import { getAll, getById, create, update, remove } from '../controllers/productos/Productos_controller.js';

// // Ver todos los productos
productosRouter.get('/', getAll);

// // Ver por id
productosRouter.get('/:id', getById);

// // Crear nuevo producto
productosRouter.post('/', create);

// // Actualizar por id
productosRouter.put('/:id', update);

// // Eliminar por id
productosRouter.delete('/:id', remove);





export default productosRouter