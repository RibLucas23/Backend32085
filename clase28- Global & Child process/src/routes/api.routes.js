import { Router } from "express";
import express from "express";

const apiRouter = Router()
// Fork
import { fork } from 'child_process';

const forkedProcess = fork('../utils/forkAction.js')


// // Ver todos los carritos
apiRouter.get('/randoms', (req, res) => {
    forkedProcess.send('INICIA');
    forkedProcess.on('message', msg => {
        console.log('mensaje desde el procesos secundario:');
        console.log(msg);
    });
    res.send('Sometido en segundo plano');
})




export default apiRouter