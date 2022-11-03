




process.on('message', numero => {
    console.log('mensaje desde el procesos principal:\n');
    console.log(numero);
    for (let i = 0; i < numero; i++) {
        let randomNum = Math.random() * numero
        process.send(`resultado en segundo plano ${randomNum}`)
        return randomNum
    }
    // let randomNum = Math.random() * numero


});

