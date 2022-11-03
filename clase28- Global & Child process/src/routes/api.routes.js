import { Router } from "express";
import express from "express";

const apiRouter = Router()
// Fork
import { fork } from 'child_process';

const forkedProcess = fork('./src/utils/forkAction.js')


// // Ver todos los carritos
apiRouter.get('/randoms', (req, res) => {
    let num = req.query.num
    if (!req.query.num) {
        num = 100000000
    }
    forkedProcess.send(num);
    forkedProcess.on('message', numero => {
        console.log('mensaje desde el procesos secundario:');
        console.log(numero);
    });
    res.send('Sometido en segundo plano');
})




export default apiRouter