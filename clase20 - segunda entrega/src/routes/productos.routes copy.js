import { Router } from "express";
import CarritosDAOsMongoDB from "../DAOs/carritos/carritosDAOs.MongoDB.js";
import ProductosDAOsMongoDb from "../DAOs/productos/productosDAOsMongoDb.js";
const productos = new ProductosDAOsMongoDb("productos")
const carritos = new CarritosDAOsMongoDB("carritos")
const productosRouter = Router()

// Ver todos los productos
productosRouter.get("/", async (req, res) => {
    const productosAll = await productos.getAll()
    console.log(productosAll)
    res.json(productosAll)
})

// Ver por id
productosRouter.get("/:id", async (req, res) => {
    const productosAll = await productos.getById(req.params.id)
    console.log(productosAll)
    res.json(productosAll)
})

// Eliminar por id
productosRouter.delete("/:id", async (req, res) => {
    await productos.eliminar(req.params.id)
    res.status(202).json('Producto Eliminado con exito')
})

// Agregar producto nuevo
productosRouter.post('/', async (req, res) => {
    try {
        const DB_PRODUCTOS = await productos.agregarNuevo(req.body);
        res.status(200).json(DB_PRODUCTOS)
    } catch (error) {
        res.status(400).json("error")
        throw new Error(error)
    }
})



productosRouter.get("/api/carritos", async (req, res) => {
    let asd = await carritos.getAll()
    res.status(200).json(asd)
})

productosRouter.get("/api/carritos/:id", async (req, res) => {
    let asd = await carritos.getById(req.params.id)
    res.status(200).json(asd)
})

productosRouter.get("/api/carritos/asd/crear", async (req, res) => {
    let asd = await carritos.crearCarrito()
    res.status(200).json(asd)
})
productosRouter.post("/api/carritos/:id/agregar", async (req, res) => {
    let asd = await carritos.agregarAlCarro(req.body, req.params.id)
    res.status(200).json(asd)
})










export default productosRouter