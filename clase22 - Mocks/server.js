import express from 'express'
const app = express()

// socket.io
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// DAOs
import carritoRouter from './src/routes/carrito.routes.js'
import productosRouter from './src/routes/productos.routes.js'
import fakerProductosRouter from "./src/routes/fakerProductos.routes.js"
// import mensajesRouter from './src/routes/mensajes.routes.js'

import MensajesDAOs from './src/DAOs/mensajes/ChatDAOs.js';
const msjDAOs = new MensajesDAOs()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Rutas
app.use("/carritos", carritoRouter)
app.use("/productos", productosRouter)
app.use("/api/productos-test", fakerProductosRouter)


app.get('/', async (req, res) => {
    const DB_MSJS = await msjDAOs.getAll();
    console.log("DB_MSJS")

    res.render('chat', { DB_MSJS });
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
    const DB_MSJS_OBJETO = { id: 123, ...DB_MSJS }
    // console.log(DB_MSJS)
    // console.log(DB_MSJS_OBJETO)
    //normalizr msjs

    const author = new schema.Entity('autores', {}, { idAttribute: 'ID' })

    const msjs = new schema.Entity('mensaje', {
        autor: author
    }, { idAttribute: 'id' })

    const msjsSchema = new schema.Entity('mensajes', {
        mensajes: [msjs]
    }, { idAttribute: 'id' });

    // obj normalizado
    console.log(' ------------- OBJETO NORMALIZADO --------------- ')
    const msjsNormalizados = normalize(DB_MSJS_OBJETO, msjsSchema);
    print(msjsNormalizados)

    console.log('Longitud objeto original: ', JSON.stringify(DB_MSJS).length)
    console.log('Longitud objeto normalizado: ', JSON.stringify(msjsNormalizados).length)
    // obj desnormalizado


    socket.emit('from-server-mensajes', { DB_MSJS });
    socket.on('from-client-mensaje', async dataMensaje => {

        const MSJ = await msjDAOs.crearMensaje(dataMensaje)
        const DB_MSJS = await msjDAOs.getAll();
        io.sockets.emit('from-server-mensajes', { DB_MSJS });
    });
})


const PORT = 8080

/* --- Inicia server ---*/
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor iniciado en -> http://localhost:${PORT}`);
});
server.on('error', (err) => console.log(`error en server ${err}`));
