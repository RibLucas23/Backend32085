const socket = io();

socket.on('from-server-mensajes', data => {
    console.log('mensajes:', data.DB_MENSAJES);
    render(data.DB_MENSAJES);
});

function render(mensajes) {
    const cuerpoMensajesHTML = mensajes.map((msj) => {
        return `<span><b>${msj.author}: </b><span>${msj.text}</span></span>`;
    }).join('<br>');
    console.log(cuerpoMensajesHTML);

    document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
}

function enviarMensaje() {
    console.log("asd") //se ve el asd pero se refresca la pagina
    const inputUser = document.querySelector('#user');
    const inputContenido = document.querySelector('#contenidoMensaje');

    const mensaje = {
        author: inputUser.value,
        text: inputContenido.value
    }

    socket.emit('from-client-mensaje', mensaje);
}
