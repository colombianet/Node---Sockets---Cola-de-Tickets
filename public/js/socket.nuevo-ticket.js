// Comando para conectar con el servidor
var socket = io();

var label = $('#lblNuevoTicket');

// Escuchar
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', (data) => {
    label.text(data.ticketActual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});