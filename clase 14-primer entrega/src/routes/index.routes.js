const express = require("express")
const routerIndex = express.Router()

const ProductosClass = require('../productos');
const objetos = new ProductosClass('./src/database/productos.json');

// Vista Index con la lista de productos
routerIndex.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.getAll();
    res.status(200).render('index', { DB_PRODUCTOS });
})



module.exports = routerIndex;
