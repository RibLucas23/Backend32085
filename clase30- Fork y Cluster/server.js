/* ---------------------- Modulos ----------------------*/
import express, { application } from 'express'
import session from "express-session";
const app = express()
//dotEnv
import dotenv from 'dotenv';
dotenv.config();
//passport
import passport from "passport";
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;
//bCrypt
import bcrypt from 'bcrypt'
//minimist 
import minimist from 'minimist';

//session persistencia mongo
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60
})
// CLuster
import cluster from 'cluster';
import os from 'os';


/* ---------------------- Middlewares---------------------- */

/*---------- socket.io  ----------*/
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
/*---------- FS ----------*/
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/*---------- DAOs ----------*/
//carritos
import carritoRouter from './src/routes/carrito.routes.js'
//productos
import productosRouter from './src/routes/productos.routes.js'
//productos faker
import fakerProductosRouter from "./src/routes/fakerProductos.routes.js"
//mensajes
import MensajesDAOs from './src/DAOs/mensajes/ChatDAOs.js';
const msjDAOs = new MensajesDAOs()
//usuarios
// import UsuariosDAOsMongoDB from './src/DAOs/usuarios/UsuariosDAOs.MongoDB.js'
import { usuariosDaos } from './src/DAOs/index.js'



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
/*---------- Session Setup ----------*/
app.use(session({
    store: MongoStore,
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000 //10 minutos
    }

}))

/*---------- Passport ----------*/


passport.use(new LocalStrategy(
    async function (username, password, done) {
        // console.log(`${username} ${password}`)
        //Logica para validar si un usuario existe
        console.log("entra existe usuario")
        let existeUsuario = await usuariosDaos.checkDisp(username)
        existeUsuario = existeUsuario[0]
        console.log(existeUsuario)
        if (!existeUsuario) {
            return done(null, false);
        } else {
            const verificacion = await verifyPass(existeUsuario, password)
            if (!verificacion) {
                return done(null, false);
            }
            return done(null, existeUsuario);
        }

        // const existeUsuario = await usuariosDaos.loginAuth(username, password);

        // if (existeUsuario.length == 0) {
        //     return done(null, false);
        // } else {
        //     return done(null, existeUsuario);
        // }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario);
});

passport.deserializeUser((USERNAME, done) => {
    const existeUsuario = USERNAME
    done(null, existeUsuario);
});

app.use(passport.initialize());
app.use(passport.session());

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

// /*---------- B CRYPT ----------*/
async function generateHashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}
async function verifyPass(usuario, password) {
    console.log("entra a verifyPass")
    const match = await bcrypt.compare(password, usuario.PASSWORD);
    console.log(`pass login: ${password} || pass hash: ${usuario.PASSWORD}`)
    return match;
}




//motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Rutas
app.use("/carritos", carritoRouter)
app.use("/productos", productosRouter)
app.use("/api/productos-test", fakerProductosRouter)
app.use("/info", infoRouter)


/* ---------------------- Routes ---------------------- */
app.get('/asd', (req, res) => {
    res.send(`Servidor express en ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`)
})
app.get('/prueba', (req, res) => {
    res.send(`Ruta especial en ${PORT} - PID ${process.pid} - ${new Date().toLocaleString()}`)
})


app.get('/', isAuth, (req, res) => {
    const datosUsuario = req.user
    res.render('productosClase24', { user: datosUsuario.USERNAME });
})

app.get('/login', (req, res) => {
    res.render('loginClase24');
})

app.get('/registro', (req, res) => {
    res.render('registro');
})

app.post('/login', passport.authenticate('local', { successRedirect: '/datos', failureRedirect: '/login-error' }));

app.get('/datos', isAuth, async (req, res) => {
    const datosUsuario = req.user
    await usuariosDaos.contador(datosUsuario.EMAIL)
    const datos = await usuariosDaos.getById(datosUsuario._id)
    res.render('datos', { datos: datos });
})

app.post('/registro', async (req, res) => {
    const { nombre, password, direccion } = req.body;
    const validacion = await usuariosDaos.checkDisp(direccion)
    console.log(validacion)
    if (!validacion) {
        res.render('register-error')
    } else {
        const newUser = {
            EMAIL: direccion,
            USERNAME: nombre,
            PASSWORD: await generateHashPassword(password),
            CONTADOR: 1
        }

        await usuariosDaos.create(newUser)
        // usuarios_DB.push({ nombre, password: password, direccion });
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    req.logOut(err => {
        res.redirect('/');
    });
})

app.get('/login-error', (req, res) => {
    res.render('login-error-clase26');
})





//======================  NORMALIZR    ===========================//
import { denormalize, normalize, schema } from 'normalizr';
import { print } from './src/utils/print.js';
import infoRouter from './src/routes/info.routes.js';

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

    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes });
    let mensajesDenorm = denormalize(
        normalizados.result,
        schemaMensajes,
        normalizados.entities
    );


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

// const PORT = 8080;

const args = minimist(process.argv.slice(2))
let PORT = args._

if (PORT.length == 0) {
    PORT = 8080
} else {
    PORT = parseInt(args._)
}


/* --- Inicia server ---*/
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor iniciado en -> http://localhost:${PORT}  -  PID WORKER ${process.pid}`);
});
server.on('error', (err) => console.log(`error en server ${err}`));
