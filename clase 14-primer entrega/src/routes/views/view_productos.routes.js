const express = require('express');
const routerProductos_view = express.Router();
// const productosJson = require("../productos.json");


const ProductosClass = require('../../productos');
const objetos = new ProductosClass('./src/database/productos.json');

const admin = true

// Defino la Base de Datos de Productos


// Ver todos los productos
routerProductos_view.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.getAll();
    res.status(200).render('productos', { DB_PRODUCTOS });
})

// Ver por id
routerProductos_view.get('/:id', async (req, res) => {
    const producto = await objetos.getById(req.params.id);
    res.status(200).json(producto);
})


// Eliminar por id
routerProductos_view.delete('/:id', async (req, res) => {
    if (admin) {
        const DB_PRODUCTOS = await objetos.eliminar(req.params.id);
        res.status(200).json(DB_PRODUCTOS);
    } else {
        res.status(400).render("error")
        throw new Error(error)

    }
})


// Agregar producto nuevo
routerProductos_view.post('/', async (req, res) => {
    if (admin) {
        const DB_PRODUCTOS = await objetos.agregarNuevo(req.body);
        res.status(201).redirect('/productos');
    } else {
        res.status(400).render("error")
        throw new Error(error)
    }
})

// Actualizar producto existente
routerProductos_view.put('/:id', async (req, res) => {
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

module.exports = routerProductos_view;
