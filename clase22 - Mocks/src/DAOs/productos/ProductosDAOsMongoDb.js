import ContenedorMongoDb from "../../contenedores/contenedorMongoDb.js";

class ProductosDAOsMongoDb extends ContenedorMongoDb {

    constructor() {
        super("productos", {
            NOMBRE: { type: String, required: true },
            PRECIO: { type: Number, required: true },
            FOTO: { type: String, required: true },
            STOCK: { type: Number, required: true },
            DESCRIPCION: { type: String, required: true },
            // ID: { type: Number, required: true },
            CODIGO: { type: String, required: true }
        })
    }
}
export default ProductosDAOsMongoDb