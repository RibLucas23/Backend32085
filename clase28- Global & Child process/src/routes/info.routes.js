import { Router } from "express";
const infoRouter = Router()
import minimist from 'minimist';

const args = minimist(process.argv.slice(2))
let argumentos = args._
let info = {
    arg: argumentos,
    sistem: process.platform,
    version: process.version,
    memory: process.memoryUsage,
    path: process.cwd(),
    processId: process.pid

}
// // Ver todos los productos
infoRouter.get('/', (req, res) => {
    console.log(info)
    res.render("info-clase28", { info });
})
export default infoRouter