// ----------------------------------- MODULOS -------------------------
const express = require('express');


// ----------------------------------- Instancia Server -------------------------

const app = express();

// ----------------------------------- Middlewares -------------------------

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

//base de datos
const DB_PERSONAS = [
    {
        nombre: 'Juan',
        apellido: 'Perez',
        edad: '30'
    }
]

// ----------------------------------- Rutas -------------------------

app.get('/', (req, res) => {
    res.render('index', { DB_PERSONAS })
});

app.post('/personas', (req, res) => {
    console.log(req.body);
    DB_PERSONAS.push(req.body);
    console.log(DB_PERSONAS);
    res.redirect('/');
});


// ----------------------------------- Server -------------------------

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
})
server.on('error', (err) => {
    console.log(err);
})