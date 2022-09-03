const express = require('express');
const routerProductos = express.Router();
// const productosJson = require("../productos.json");


const ProductosClass = require('../productos');
const objetos = new ProductosClass('./src/productos.json');


// Defino la Base de Datos de Productos


routerProductos.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.traerProductos();
    res.status(200).render('productos', { DB_PRODUCTOS });
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
    const DB_PRODUCTOS = await objetos.agregarProducto(req.body);
    res.status(201).redirect('/productos');
})
routerProductos.put('/:id', async (req, res) => {
    const producto = await objetos.productoPorId(req.params.id);
    const productoEditado = req.body;
    producto.title = productoEditado.title;
    producto.price = productoEditado.price;
    res.status(200).json(producto);
})

module.exports = routerProductos;
