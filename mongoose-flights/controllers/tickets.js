const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        // Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('tickets/new', {
                title: "Add a new ticket",
                flight
            });
        // });
    });
}


module.exports = {
    new: newTicket
}