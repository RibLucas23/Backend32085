const express = require('express');
const routerApiProductos = express.Router();
// const productosJson = require("../productos.json");


const ProductosClass = require('../productos');
const objetos = new ProductosClass('./src/database/productos.json');

const admin = true

// Defino la Base de Datos de Productos


// Ver todos los productos
routerApiProductos.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.getAll();
    res.status(200).json(DB_PRODUCTOS)
    // res.status(200).render('productos', { DB_PRODUCTOS });
})

// Ver por id
routerApiProductos.get('/:id', async (req, res) => {
    const producto = await objetos.getById(req.params.id);
    res.status(200).json(producto);
})


// Eliminar por id
routerApiProductos.delete('/:id', async (req, res) => {
    if (admin) {
        const DB_PRODUCTOS = await objetos.eliminar(req.params.id);
        res.status(200).json(DB_PRODUCTOS);
    } else {
        res.status(400).render("error")
        throw new Error(error)

    }
})


// Agregar producto nuevo
routerApiProductos.post('/', async (req, res) => {
    if (admin) {
        const DB_PRODUCTOS = await objetos.agregarNuevo(req.body);
        res.status(200).json(DB_PRODUCTOS)
        // res.status(201).redirect('/api/productos');
    } else {
        res.status(400).render("error")
        throw new Error(error)
    }
})

// Actualizar producto existente
routerApiProductos.put('/:id', async (req, res) => {
    if (admin) {
        const producto = await objetos.getById(req.params.id);
        const productoEditado = req.body;
        producto.title = productoEditado.title;
        producto.price = productoEditado.price;
        res.status(200).json(producto);
    } else {
        res.status(400).render("error")
        throw new Error(error)

    }
})

module.exports = routerApiProductos;
