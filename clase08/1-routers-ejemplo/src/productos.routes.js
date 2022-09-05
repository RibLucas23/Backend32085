const express = require('express');
const multer = require('multer');
const routerMascotas = express.Router();

/*DB*/
const DB_MASCOTAS = [];

/*Middlewares*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
});
const upload = multer({ storage: storage });

routerProducots.get('/', (req, res) => {
    res.status(200).json(DB_MASCOTAS);
});

routerProducots.get('/darPatita', (req, res) => {
    res.status(200).json({ msg: 'Te da la patita!' });
});

routerProducots.post('/', upload.single('miArchivo'), (req, res, next) => {
    if (!req.file) {
        const err = new Error('Favor agregar archivo');
        return next(err);
    } else {
        console.log(req.body);
        DB_MASCOTAS.push(req.body);
        res.status(201).json({ msg: 'Agregado!', data: req.body });
    }
});

module.exports = routerProducots;
