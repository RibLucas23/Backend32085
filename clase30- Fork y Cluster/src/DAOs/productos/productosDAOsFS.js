import ContenedorFS from "../../contenedores/contenedorFS.js";

class ProductosDAOsFS extends ContenedorFS {

    constructor() {
        super(`./src/DB/productosDB.json`)
    }
}

export default ProductosDAOsFS