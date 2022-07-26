const express = require('express');
const routerProductos = express.Router();
// const productosJson = require("../productos.json");
const fs = require('fs/promises');

const ProductosClass = require('../productos');
const DB_PRODUCTOS = new ProductosClass('./src/productos.json');


// Defino la Base de Datos de Productos


routerProductos.get('/', async (req, res) => {
    const productosAll = await DB_PRODUCTOS.traerProductos();
    res.status(200).json(productosAll);
})

routerProductos.get('/:id', async (req, res) => {
    const producto = await DB_PRODUCTOS.productoPorId(req.params.id);
    res.status(200).json(producto);
})

routerProductos.delete('/:id', async (req, res) => {
    const producto = await DB_PRODUCTOS.eliminarProducto(req.params.id);
    res.status(200).json(producto);
})


routerProductos.post('/', async (req, res) => {
    const productosAll = await DB_PRODUCTOS.traerProductos()
    const producto = req.body;
    producto.id = productosAll.length + 1;
    productosAll.push(producto);
    res.status(201).json({ msg: "agrgado", data: req.body });
})
routerProductos.put('/:id', async (req, res) => {
    const producto = await DB_PRODUCTOS.productoPorId(req.params.id);
    const productoEditado = req.body;
    producto.title = productoEditado.title;
    producto.price = productoEditado.price;
    res.status(200).json(producto);
})

module.exports = routerProductos;