import ContenedorMongoDb from "../../contenedores/contenedorMongoDb.js";

class CarritosDAOsMongoDB extends ContenedorMongoDb {

    constructor() {
        super("carritos", {
            FECHA: { type: String, required: true },
            CODIGO: { type: String, required: true },
            PRODUCTOS: { type: [], required: true }
        })
    }
}
export default CarritosDAOsMongoDB