




process.on('message', numero => {
    console.log('mensaje desde el procesos principal:\n');
    console.log(numero);
    let numeros = []
    for (let i = 0; i < numero; i++) {
        let randomNum = Math.random() * numero
        numeros.push(randomNum)

    }
    process.send(numeros)
    // let randomNum = Math.random() * numero


});

