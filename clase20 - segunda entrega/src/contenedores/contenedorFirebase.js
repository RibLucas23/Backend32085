//firebase
import admin from "firebase-admin"
import ServiceAccount from "../DB/crt/crtFirebase.js"
admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount)
});
const db = admin.firestore()

class ContenedorFirebase {

    constructor(colleccion) {
        this.colleccion = db.collection(colleccion)
    }

    // GET ALL
    async getAll() {
        try {
            let respuesta = await this.colleccion.get()
            let res = respuesta.docs.map((documento) => ({
                id: documento.id, ...documento.data()
            }))
            return res
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
    //GET BY ID
    async getById(id) {
        try {
            let doc = this.colleccion.doc(`${id}`)
            let respuesta = await doc.get()
            respuesta = respuesta.data()
            if (!respuesta) {
                const error = new Error(`no hay nada con  ID: ${id} `)
                error.status = 404
                throw error
            }
            return respuesta

        } catch (error) {
            console.log(error)
            throw error
        }
    }
    // CREATE
    async create(data) {
        let fecha = new Date().toLocaleString()
        let codigo = Math.random().toString(36).substr(2, 18)

        data = { ...data, FECHA: fecha, CODIGO: codigo }
        try {
            let doc = this.colleccion.doc()
            return await doc.create(data)

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
    // UPDATE
    async update(id, objetoNuevo) {
        try {
            let doc = this.colleccion.doc(`${id}`)
            if (!doc) {
                const error = new Error(`no hay nada con  ID: ${id} `)
                error.status = 404
                throw error
            }
            let res = await doc.update(objetoNuevo)
            console.log("producto actualizado")
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    //REMOVE
    async remove(id) {
        try {
            let doc = this.colleccion.doc(`${id}`)
            if (!doc) {
                const error = new Error(`no hay nada con  ID: ${id} `)
                error.status = 404
                throw error
            }
            let res = await doc.delete()
            return res
        } catch (error) {
            console.log(error)
            throw error
        }
    }


}

export default ContenedorFirebase