const express = require('express');
// import { Express } from 'express';
const routerProductos = express.Router();


const ContenedorSQL = require('../container/ContenedorSQL');
const objetos = new ContenedorSQL('productos');


// Defino la Base de Datos de Productos


routerProductos.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.listarAll();
    res.status(200).render('productosHistorial', { DB_PRODUCTOS });
})

routerProductos.get('/:id', async (req, res) => {
    const producto = await objetos.listar(req.params.id);
    res.status(200).json(producto);
})

routerProductos.delete('/:id', async (req, res) => {
    const producto = await objetos.eliminar(req.params.id);
    res.status(200).json(producto);
})


routerProductos.post('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.insertar(req.body);
    res.status(201).redirect('/productos');
})
routerProductos.put('/:id', async (req, res) => {
    const producto = await objetos.listar(req.params.id);
    const productoEditado = req.body;
    producto.title = productoEditado.title;
    producto.price = productoEditado.price;
    res.status(200).json(producto);
})

module.exports = routerProductos;