const express = require('express')
const routerCarrito = express.Router()

const ProductosClass = require('../productos')
const carrito = new ProductosClass("./src/database/carrito.json")


routerCarrito.post("/", async (req, res) => {
    const DB_CARRITO = await carrito.crearCarrito(req.body)
    res.status(200).json(DB_CARRITO)
})

routerCarrito.get("/:id", async (req, res) => {
    const DB_CARRITO = await carrito.productoPorId(req.params.id);
    res.status(200).json(DB_CARRITO);
})

routerCarrito.delete("/:id", async (req, res) => {
    const DB_CARRITO = await carrito.eliminarProducto(req.params.id)
    res.status(200).json(DB_CARRITO);
})

routerCarrito.get("/:id/productos", async (req, res) => {
    const DB_CARRITO = await carrito.productoPorId(req.params.id);
    res.status(200).json(DB_CARRITO.productos);
})

routerCarrito.post("/:id/productos", async (req, res) => {
    const DB_CARRITO = await carrito.productoPorId(req.params.id);
    DB_CARRITO.productos = await carrito.agregarProductoAlCarro(req.body, req.params.id)
    res.status(200).json(DB_CARRITO)

})







module.exports = routerCarrito;
