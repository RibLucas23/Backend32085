import express from 'express';
const app = express();

// socket.io
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// DAOs
import carritoRouter from './src/routes/carrito.routes.js';
import productosRouter from './src/routes/productos.routes.js';
import fakerProductosRouter from './src/routes/fakerProductos.routes.js';
// import mensajesRouter from './src/routes/mensajes.routes.js'

import MensajesDAOs from './src/DAOs/mensajes/ChatDAOs.js';
const msjDAOs = new MensajesDAOs();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Rutas
app.use('/carritos', carritoRouter);
app.use('/productos', productosRouter);
app.use('/api/productos-test', fakerProductosRouter);

app.get('/', async (req, res) => {
  const DB_MSJS = await msjDAOs.getAll();
  console.log('DB_MSJS');

  res.render('chat', { DB_MSJS });
});
//======================  NORMALIZR    ===========================//
import { denormalize, normalize, schema } from 'normalizr';
import { print } from './src/utils/print.js';

const schemaAuthor = new schema.Entity('AUTHOR', {}, { idAttribute: 'ID' });

const schemaMensaje = new schema.Entity(
  'MENSAJE',
  { AUTHOR: schemaAuthor },
  { idAttribute: 'id' }
);

const schemaMensajes = new schema.Entity(
  'mensajes',
  { mensajes: [schemaMensaje] },
  { idAttribute: 'id' }
);

const normalizarMensajes = (mensajesConId) =>
  normalize(mensajesConId, schemaMensajes);

async function listarMensajesNormalizados() {
  const mensajes = await msjDAOs.getAll();
  console.log(
    `Los mensajes sin normalizar: ${JSON.stringify(mensajes).length}`
  );
  const normalizados = normalizarMensajes({ id: 'mensajes', mensajes });
  let mensajesDenorm = denormalize(
    normalizados.result,
    schemaMensajes,
    normalizados.entities
  );
  print(mensajesDenorm);
  console.log(
    `Los mensajes normalizados: ${JSON.stringify(normalizados).length}`
  );
  print(normalizados);
  return normalizados;
}

//======================  WEB SOCKET    ===========================//

io.on('connection', async (socket) => {
  console.log(`Nuevo cliente conectado! ${socket.id}`);

  //chat
  const DB_MSJS = await listarMensajesNormalizados();

  socket.emit('from-server-mensajes', { DB_MSJS });
  socket.on('from-client-mensaje', async (dataMensaje) => {
    const MSJ = await msjDAOs.crearMensaje(dataMensaje);
    const DB_MSJS = await listarMensajesNormalizados();
    io.sockets.emit('from-server-mensajes', { DB_MSJS });
  });
});

const PORT = 8080;

/* --- Inicia server ---*/
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor iniciado en -> http://localhost:${PORT}`);
});
server.on('error', (err) => console.log(`error en server ${err}`));
