import express from 'express'
//firebase
// import admin from "firebase-admin"
// import ServiceAccount from "./src/DB/crt/crtFirebase.js"
// admin.initializeApp({
//     credential: admin.credential.cert(ServiceAccount)
// });


import carritoRouter from './src/routes/carrito.routes.js'
import productosRouter from './src/routes/productos.routes.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/carritos", carritoRouter)
app.use("/productos", productosRouter)

export default app