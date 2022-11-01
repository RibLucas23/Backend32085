import ContenedorMongoDb from "../../contenedores/contenedorMongoDb.js";

class UsuariosDAOsMongoDB extends ContenedorMongoDb {

    constructor() {
        super("usuarios", {
            EMAIL: { type: String, required: true },
            USERNAME: { type: String, required: true },
            PASSWORD: { type: String, required: true },
            CONTADOR: { type: Number, required: true }
        })
    }


    async checkDisp(email) {
        try {
            let validacion = await this.coleccion.find({ EMAIL: email })
            if (validacion.length == 0) {
                console.log("falso")
                return false
            }
            return validacion
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async loginAuth(user, password) {
        try {
            let validacion = await this.coleccion.find({ USERNAME: user, PASSWORD: password })
            if (validacion.length == 0) {
                return false
            }
            return validacion


        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
    async contador(email) {
        try {
            let usuario = await this.coleccion.find({ EMAIL: email })
            console.log("usuario en contador")
            console.log(usuario)

            if (!usuario) {
                const error = new Error(`no hay usuario con ese mail: ${email} `)
                error.status = 404
                throw error
            }

            let contador = usuario[0].CONTADOR
            contador++

            return await this.coleccion.updateOne({ EMAIL: { $eq: email } }, { $set: { CONTADOR: contador } })
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

}
export default UsuariosDAOsMongoDB