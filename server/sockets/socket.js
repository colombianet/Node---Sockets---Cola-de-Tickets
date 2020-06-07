const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        if (!callback) return;
        callback(siguiente);
    });

    client.emit('estadoActual', {
        ticketActual: ticketControl.getTicketActual(),
        ultimos4: ticketControl.getTicketUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return 'El escritorio es necesario';
        }

        let atenderticket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderticket);

        client.broadcast.emit('ultimos4', {
            ticketActual: ticketControl.getTicketActual(),
            ultimos4: ticketControl.getTicketUltimos4()
        });
    });

});