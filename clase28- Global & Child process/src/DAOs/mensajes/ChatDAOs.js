import ContenedorFirebase from "../../contenedores/contenedorFirebase.js";
import { faker } from '@faker-js/faker';

class MensajesDAOs extends ContenedorFirebase {

    constructor() {
        super("mensajes")
    }

    // generar MENSJAE
    async crearMensaje(data) {
        console.log(data)
        try {
            return super.create(data)

        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // generar fake prod
    async crearMensajeFaker() {
        let fecha = new Date().toLocaleString()
        try {
            let mensajeNew = {
                AUTHOR: {
                    FECHA: fecha,
                    ID: faker.internet.email(),
                    NOMBRE: faker.name.firstName(),
                    APELLIDO: faker.name.lastName(),
                    EDAD: faker.datatype.number(),
                    NICK: faker.name.middleName(),
                    AVATAR: faker.image.avatar()
                },
                MENSAJE: faker.commerce.productDescription(),
            }
            return super.create(mensajeNew)

        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}
export default MensajesDAOs