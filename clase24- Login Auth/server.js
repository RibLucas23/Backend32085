/* ---------------------- Modulos ----------------------*/
import express, { application } from 'express'
import session from "express-session";
const app = express()
import dotenv from 'dotenv';
dotenv.config();

//session persistencia mongo
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60
})

/* ---------------------- Middlewares---------------------- */

// socket.io
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
//FS
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// DAOs
import carritoRouter from './src/routes/carrito.routes.js'
import productosRouter from './src/routes/productos.routes.js'
import fakerProductosRouter from "./src/routes/fakerProductos.routes.js"

import MensajesDAOs from './src/DAOs/mensajes/ChatDAOs.js';
const msjDAOs = new MensajesDAOs()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

//Session Setup
app.use(session({
    store: MongoStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))
// Session Middleware
function auth(req, res, next) {
    if (req.session?.user && req.session?.admin) {
        return next()
    }
    return res.status(401).send('error de autorización!')
}


//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Rutas
app.use("/carritos", carritoRouter)
app.use("/productos", productosRouter)
app.use("/api/productos-test", fakerProductosRouter)


// app.get('/', async (req, res) => {
//     const DB_MSJS = await msjDAOs.getAll();
//     console.log("DB_MSJS")

//     res.render('chat', { DB_MSJS });
// })

/* ---------------------- Routes ---------------------- */
app.get('/con-session', (req, res) => {
    if (!req.session.contador) {
        req.session.contador = 1;
        res.send('Bienvenid@, primer login!');
    } else {
        req.session.contador++;
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces`)
    }
});

app.get('/info', (req, res) => {
    res.send(req.sessionID);
});

//Simulando un login
app.get('/login', (req, res) => {
    res.render("loginClase24")
})
app.post("/login", (req, res) => {
    const { username } = req.body

    //si quisiera verificar user y pass haria esto:
    // const { username, password } = req.body
    // if (username !== 'pepe' || password !== 'pepepass') {
    //     return res.send('login failed')
    // }

    req.session.user = username;
    req.session.admin = true;
    res.redirect("/privado")
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ err });
        } else {
            res.send('Logout ok!');
        }
    });
});
app.post('/privado', (req, res) => {
    const user = req.session.user;
    // si usuario no existe redirecciona a login
    if (!user) {
        res.redirect('/login');
        return; // acá hace falta return para cortar la ejecucion, porque redirect aparentemente no la termina
    }
    // si no, mostrar vista de despedida
    req.session.destroy((err) => {
        if (err) {
            res.json({ err });
        }
        res.render('logout', { user });
    });
});


app.get('/privado', auth, (req, res) => {
    let user = req.session.user
    res.render("productosClase24", { user })
})























//======================  NORMALIZR    ===========================//
import { denormalize, normalize, schema } from "normalizr"
import { print } from './src/utils/print.js'
// const author = new schema.Entity('AUTHOR');

// const mensajes = new schema.Entity('mensajes', {
//     author: [author],
//     mensaje: mensaje,
// });
// console.log(' ------------- OBJETO NORMALIZADO --------------- ')
// const msjsNormalizados = normalize(author, mensajes);
// console.log(msjsNormalizados)



//======================  WEB SOCKET    ===========================//

io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado! ${socket.id}`);

    //chat 
    const DB_MSJS = await msjDAOs.getAll();
    const DB_MSJS_OBJETO = { ...DB_MSJS }
    // console.log(DB_MSJS)
    // console.log(DB_MSJS_OBJETO)
    //normalizr msjs
    // const author = new schema.Entity('autores', {}, { idAttribute: 'ID' })
    // const msjs = new schema.Entity('mensajes', {
    //     autor: author
    // }, { idAttribute: 'MENSAJE' })
    // const msjsSchema = new schema.Entity('mensajes', {
    //     autor: author,
    //     mensajes: [msjs]
    // });
    // obj normalizado
    // console.log(' ------------- OBJETO NORMALIZADO --------------- ')
    // const msjsNormalizados = normalize(DB_MSJS_OBJETO, msjsSchema);
    // print(msjsNormalizados)

    // console.log('Longitud objeto original: ', JSON.stringify(DB_MSJS).length)
    // console.log('Longitud objeto normalizado: ', JSON.stringify(msjsNormalizados).length)
    // obj desnormalizado


    socket.emit('from-server-mensajes', { DB_MSJS });
    socket.on('from-client-mensaje', async dataMensaje => {

        const MSJ = await msjDAOs.crearMensaje(dataMensaje)
        const DB_MSJS = await msjDAOs.getAll();
        io.sockets.emit('from-server-mensajes', { DB_MSJS });
    });
})


const PORT = process.env.PORT

/* --- Inicia server ---*/
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor iniciado en -> http://localhost:${PORT}`);
});
server.on('error', (err) => console.log(`error en server ${err}`));
