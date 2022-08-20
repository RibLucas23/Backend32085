const express = require('express');
const routerProductos = express.Router();
// const productosJson = require("../productos.json");


const ProductosClass = require('../productos');
const objetos = new ProductosClass('../productos.json');


// Defino la Base de Datos de Productos


routerProductos.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.traerProductos();
    res.status(200).render('index', { DB_PRODUCTOS });
})

routerProductos.get('/:id', async (req, res) => {
    const producto = await objetos.productoPorId(req.params.id);
    res.status(200).json(producto);
})

routerProductos.delete('/:id', async (req, res) => {
    const producto = await objetos.eliminarProducto(req.params.id);
    res.status(200).json(producto);
})


routerProductos.post('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.traerProductos();
    const producto = req.body;
    producto.id = DB_PRODUCTOS.length + 1;
    DB_PRODUCTOS.push(producto);
    console.log(DB_PRODUCTOS);
    res.status(201).redirect('/');
})
routerProductos.put('/:id', async (req, res) => {
    const producto = await objetos.productoPorId(req.params.id);
    const productoEditado = req.body;
    producto.title = productoEditado.title;
    producto.price = productoEditado.price;
    res.status(200).json(producto);
})

module.exports = routerProductos;