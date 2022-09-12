/* ---------------------- Modulos ----------------------*/
let express = require('express');
const morgan = require('morgan');
//clases productos vieja
const ContenedorSQL = require('./src/container/ContenedorSQL');
const mensajes = new ContenedorSQL('mensajes')
const path = require('path');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');


//Instancia de Server
const app = express();
const routerProductos = require("./src/routes/productos.routes");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


/* ---------------------- Middlewares ----------------------*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));

//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');


// DB Hardcodeada solo para probar




/* ---------------------- Rutas ----------------------*/
app.use('/productos', routerProductos);

app.get('/', async (req, res) => {
    const DB_MSJS = await mensajes.listarAll();
    console.log(DB_MSJS)
    res.render('productos', { DB_MSJS });
})



//Errores GLobales

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ error: { status: error.status || 500, message: error.message || 'Internal Server Error.' } });
})




/* ---------------------- Servidor ----------------------*/
const server = httpServer.listen(3060, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});


/* ---------------------- WebSocket ----------------------*/


io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    // const objetos_webSocket = new ProductosClass_webSocket('./public/productos.json')

    //chat 

    const DB_MSJS = await mensajes.listarAll();
    socket.emit('from-server-mensajes', { DB_MSJS });
    socket.on('from-client-mensaje', async mensaje => {

        const DB_MSJS = await mensajes.insertar(mensaje)
        io.sockets.emit('from-server-mensajes', { DB_MSJS });
    });

    //Productos

    // const DB_PRODUCTOS = await objetos_webSocket.traerProductos()
    // io.sockets.emit('from-server-productos', DB_PRODUCTOS)



    // socket.on("from-client-producto", async producto => {

    //     await objetos_webSocket.agregarProducto(producto)
    //     console.log(DB_PRODUCTOS)
    //     io.sockets.emit('from-server-productos', await DB_PRODUCTOS)
    // })

})

