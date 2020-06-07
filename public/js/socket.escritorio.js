// Comando para conectar con el servidor
var socket = io();

var titulo = $('h1');
var label = $('small');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio necesario');
}

var escritorio = searchParams.get('escritorio');

titulo.text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(data) {
        if (data === 'No hay tickets') {
            alert(data);
            label.text(data);
            return;
        }

        audio = new Audio('audio/new-ticket.mp3');
        audio.play();
        console.log(data);
        label.text(data.numero);
    });
});