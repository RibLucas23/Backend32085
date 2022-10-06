import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";
import { faker } from '@faker-js/faker';

class FakerProdDAOs extends ContenedorFirebase {

    constructor() {
        super("productosFaker")
    }

    // generar fake prod
    async crearMensaje() {
        let fecha = new Date().toLocaleString()
        try {
            let fakeProdNew = {
                FECHA: fecha,
                NOMBRE: faker.commerce.productName(),
                PRECIO: faker.commerce.price(),
                FOTO: faker.image.business(),
                STOCK: 100,
                DESCRIPCION: faker.commerce.productDescription(),
            }
            return super.create(fakeProdNew)
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}
export default FakerProdDAOs