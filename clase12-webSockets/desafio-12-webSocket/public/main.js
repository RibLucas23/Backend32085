const socket = io();

socket.on('from-server-mensajes', data => {
    render(data.DB_MENSAJES);
});

function render(mensajes) {
    let fecha = new Date()
    let fyh = fecha.toLocaleString()
    const cuerpoMensajesHTML = mensajes.map((msj) => {
        return `<span>
                    <b class="email">${msj.author}: </b>
                    <span class="fyh">${fyh}</span>
                    <span class="texto">${msj.text}</span>
                </span>`;
    }).join('<br>');


    document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
}

function enviarMensaje() {
    const inputUser = document.querySelector('#user');
    const inputContenido = document.querySelector('#contenidoMensaje');

    const mensaje = {
        author: inputUser.value,
        text: inputContenido.value
    }

    socket.emit('from-client-mensaje', mensaje);
}


// ----------------------------- Productos --------------------------------//


socket.on('from-server-productos', async (data) => {

    renderProductos(data)
    // mostrarProductos(data.DB_PRODUCTOS);
});

function renderProductos(productos) {
    console.log(productos)
    const cuerpoProductosHTML = productos.map((producto) => {
        return `<tr>
                    <td >${producto.title}: </td>
                    <td >$ ${producto.price}</td>
                    <td > <img width=50 src="${producto.thumbnail}" alt=""> </img>  </td>
                </tr>
                `;
    }).join('<br>');

    document.querySelector('#tablaProductos').innerHTML = cuerpoProductosHTML
}
function enviarProducto() {
    const title = document.querySelector('#title');
    const price = document.querySelector('#price');
    const thumbnail = document.querySelector('#thumbnail');
    const producto = {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value

    }
    console.log(producto)

    socket.emit('from-client-producto', producto);
}




// function mostrarProductos(productos) {
//     console.log(productos)
//     const cuerpoMensajesHTML = mensajes.map((msj) => {
//         return `<span>
//                     <b class="email">${msj.author}: </b>
//                     <span class="fyh">${fyh}</span>
//                     <span class="texto">${msj.text}</span>
//                 </span>`;
//     }).join('<br>');


//     document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
// }