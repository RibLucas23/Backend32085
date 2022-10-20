import mongoose from "mongoose";
import { config } from "../utils/config.js";

await mongoose.connect(config.mongoDb.strConn, config.mongoDb.options)

class ContenedorMongoDb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }
    //TRAE TODOS LOS OBJETOS DEL JSON
    async getAll() {
        try {
            const productosALl = await this.coleccion.find({})
            return productosALl
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }



    //TRAE PRODUCTO POR ID
    async getById(id) {

        try {
            const objeto = await this.coleccion.find({ _id: id })
            if (!objeto) {
                const error = new Error(`no hay nada con  ID: ${id} `)
                error.status = 404
                throw error
            }
            return objeto

        }
        catch (error) {

            throw new Error(error)
        }
    }
    //Actualizar 
    async update(id, objeto) {
        try {
            let objViejo = await this.coleccion.find({ _id: id })
            if (!objViejo) {
                const error = new Error(`no hay nada con  ID: ${id} `)
                error.status = 404
                throw error
            }

            await this.coleccion.replaceOne({ "_id": id }, objeto)
            console.log("Actualizado con exito!")


        } catch (error) {
            console.log(error)
            throw error
        }

    }




    //ELIMINA POR ID
    async remove(id) {

        try {
            let objeto = await this.coleccion.findOneAndDelete({ _id: id })
            return objeto
        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    //AGREGA UN PRODUCTO
    async create(objeto) {

        try {
            //DEFINO EL OBJETO
            const objNuevo = {
                NOMBRE: objeto.NOMBRE,
                PRECIO: objeto.PRECIO,
                FOTO: objeto.FOTO,
                STOCK: objeto.STOCK,
                DESCRIPCION: objeto.DESCRIPCION,
                CODIGO: Math.random().toString(36).substr(2, 18)

            }
            //Y LO AGREGO A LA COLECCION
            await this.coleccion.insertMany(objNuevo)
            return objNuevo

        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // CREAR CARRO 
    async crearCarrito() {
        let fecha = new Date()
        fecha = fecha.toLocaleString()
        try {
            let carritoNew = {
                FECHA: fecha,
                CODIGO: Math.random().toString(36).substr(2, 18)
            }
            await this.coleccion.insertMany(carritoNew)
            return carritoNew

        }
        catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    // AGREGAR PROD AL CARRO
    async agregarAlCarro(producto, id) {
        let fecha = new Date()
        fecha = fecha.toLocaleString()
        let carrito = await this.getById(id)
        producto.FECHA = fecha

        await this.coleccion.updateOne({ _id: id }, { $push: { PRODUCTOS: producto } })
        return carrito
    }



}

export default ContenedorMongoDb