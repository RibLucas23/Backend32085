const socket = io();


socket.on('from-server-mensajes', data => {
    console.log(data.DB_MSJS)
    render(data.DB_MSJS);
});

function render(mensajes) {
    let fecha = new Date()
    console.log(mensajes)
    const cuerpoMensajesHTML = mensajes.map((msj) => {
        return `<span>
                    <b class="email">${msj.AUTHOR.ID}: </b>
                    <span class="fyh">${msj.AUTHOR.FECHA}</span>
                    <span class="texto">${msj.MENSAJE}</span>
                    <img  class="avatar" src=${msj.AUTHOR.AVATAR} alt="">
                </span>`;
    }).join('<br>');


    document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
}

function enviarMensaje() {
    let fecha = new Date().toLocaleString()

    const inputEmail = document.querySelector('#EMAIL');
    const inputNombre = document.querySelector('#NOMBRE');
    const inputApellido = document.querySelector('#APELLIDO');
    const inputEdad = document.querySelector('#EDAD');
    const inputNick = document.querySelector('#NICK');
    const inputMensaje = document.querySelector('#MENSAJE');
    const inputAvatar = document.querySelector("#AVATAR")

    const dataMensaje = {

        AUTHOR: {
            ID: inputEmail.value,
            NOMBRE: inputNombre.value,
            APELLIDO: inputApellido.value,
            EDAD: inputEdad.value,
            NICK: inputNick.value,
            FECHA: fecha,
            AVATAR: inputAvatar.value
        },
        MENSAJE: inputMensaje.value,
    }

    socket.emit('from-client-mensaje', dataMensaje);
}

