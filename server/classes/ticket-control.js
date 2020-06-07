const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl {

    constructor() {
        let data = require('../data/data.json');
        this.ticketActual = 0;
        this.diaActual = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        if (data.diaActual === this.diaActual) {
            data.ticketActual = this.ticketActual;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarSistema();
        }
    }

    siguiente() {
        this.ticketActual += 1;
        let ticket = new Ticket(this.ticketActual, null);
        this.tickets.push(ticket);

        this.grabarData();

        return `Ticket ${ this.ticketActual }`;
    }

    getTicketActual() {
        return `Ticket ${ this.ticketActual }`;
    }

    getTicketUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // Eliminar último
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarData();
        return atenderTicket;

    }

    reiniciarSistema() {
        this.ticketActual = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha reinicializado el contéo');
        this.grabarData();
    }

    grabarData() {
        let dataJson = {
            ticketActual: this.ticketActual,
            diaActual: this.diaActual,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        let dataJsonString = JSON.stringify(dataJson);
        fs.writeFileSync('./server/data/data.json', dataJsonString);
    }
}

module.exports = {
    TicketControl
}