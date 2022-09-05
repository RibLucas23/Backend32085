/* ---------------------- Modulos ----------------------*/
let express = require('express');
const morgan = require('morgan');
//clases productos vieja
const ProductosClass = require('./src/productos');
const objetos = new ProductosClass('./src/productos.json');

//clases productos nueva
const ProductosClass_webSocket = require('./public/productos')
// const objetos_webSocket = new ProductosClass_webSocket('./public/productos.json')

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
const DB_MENSAJES = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
]



/* ---------------------- Rutas ----------------------*/
app.use('/productos', routerProductos);

app.get('/', async (req, res) => {
    const DB_PRODUCTOS = await objetos.traerProductos();
    res.render('productos', { DB_PRODUCTOS });
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public', 'index.html'));
// });




//Errores GLobales

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({ error: { status: error.status || 500, message: error.message || 'Internal Server Error.' } });
})




/* ---------------------- Servidor ----------------------*/
const server = httpServer.listen(8080, () => {
    console.log(`Server running on http://localhost:${server.address().port}`);
});


/* ---------------------- WebSocket ----------------------*/


io.on('connection', async (socket) => {
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    const objetos_webSocket = new ProductosClass_webSocket('./public/productos.json')

    //chat 

    socket.emit('from-server-mensajes', { DB_MENSAJES });
    socket.on('from-client-mensaje', mensaje => {
        DB_MENSAJES.push(mensaje);
        io.sockets.emit('from-server-mensajes', { DB_MENSAJES });
    });
    //Productos

    const DB_PRODUCTOS = await objetos_webSocket.traerProductos()
    io.sockets.emit('from-server-productos', DB_PRODUCTOS)



    socket.on("from-client-producto", async producto => {

        await objetos_webSocket.agregarProducto(producto)
        console.log(DB_PRODUCTOS)
        io.sockets.emit('from-server-productos', await DB_PRODUCTOS)
    })

})



// const mensajes = await mensaje.getAll()
//     io.sockets.emit('from-server-mensajes', mensajes)
// socket.on('from-client-mensaje', mensaje => {
//         mensajes.push(mensaje)
//         io.sockets.emit('from-server-mensajes', mensajes)
//     })
