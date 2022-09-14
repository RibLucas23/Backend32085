const express = require('express')
const routerCarrito = express.Router()

const ProductosClass = require('../productos')
const carrito = new ProductosClass("./src/database/carrito.json")

//  Crear carrito
routerCarrito.post("/", async (req, res) => {
    const DB_CARRITO = await carrito.crearCarrito(req.body)
    res.status(200).json(DB_CARRITO)
})

// Producto por id
routerCarrito.get("/:id", async (req, res) => {
    const DB_CARRITO = await carrito.getById(req.params.id);
    res.status(200).json(DB_CARRITO);
})

// Borrar carrito
routerCarrito.delete("/:id", async (req, res) => {
    const DB_CARRITO = await carrito.eliminar(req.params.id)
    res.status(200).json(DB_CARRITO);
})

// Ver contenido del carrito
routerCarrito.get("/:id/productos", async (req, res) => {
    const DB_CARRITO = await carrito.getById(req.params.id);
    res.status(200).json(DB_CARRITO.productos);
})

// Agregar producto al carro
routerCarrito.post("/:id/productos", async (req, res) => {
    const DB_CARRITO = await carrito.agregarProductoAlCarro(req.body, req.params.id)
    res.status(200).json(DB_CARRITO)
})

// Eliminar carrito por id
routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    const DB_CARRITO = await carrito.eliminarProdCarro(req.params.id, req.params.id_prod)
    res.status(200).json(DB_CARRITO);
})






module.exports = routerCarrito;
