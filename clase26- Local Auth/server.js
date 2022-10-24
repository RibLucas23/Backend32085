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


//session persistencia mongo
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 60
})

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


// app.get('/', async (req, res) => {
//     const DB_MSJS = await msjDAOs.getAll();
//     console.log("DB_MSJS")

//     res.render('chat', { DB_MSJS });
// })

/* ---------------------- Routes ---------------------- */

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
