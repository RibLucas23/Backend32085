let productosDaos
let carritosDaos
let PERS = "firebase"
switch (PERS) {
    //firebase
    case "firebase":
        const { default: ProductosDaosFirebase } = await import('./productos/ProductosDaosFirebase.js')
        const { default: CarritosDAOsFirebase } = await import('./carritos/CarritosDAOs.Firebase.js')
        productosDaos = new ProductosDaosFirebase()
        carritosDaos = new CarritosDAOsFirebase()

        break;

    //memoria
    case "memoria":
        const { default: ProductosDaosMemoria } = await import('./productos/ProductosDaosMemoria.js')
        const { default: CarritoDaosMemoria } = await import('./carritos/carritosDAOsMemoria.js')
        productosDaos = new ProductosDaosMemoria()
        carritosDaos = new CarritoDaosMemoria()

        break;

    case "mongoDb":
        const { default: ProductosDAOsMongoDb } = await import('./productos/ProductosDAOsMongoDb.js')
        const { default: CarritosDAOsMongoDB } = await import('./carritos/carritosDAOs.MongoDB.js')
        productosDaos = new ProductosDAOsMongoDb()
        carritosDaos = new CarritosDAOsMongoDB()

        break;
    case "FS":
        const { default: ProductosDAOsFS } = await import('./productos/productosDAOsFS.js')
        // const { default: CarritoDaosMemoria } = await import('./carritos/carritosDAOsMemoria.js')
        productosDaos = new ProductosDAOsFS()
        // carritosDaos = new CarritoDaosMemoria()

        break;

    default:

        break;
}





export { productosDaos, carritosDaos }