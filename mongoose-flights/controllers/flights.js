const Flight = require('../models/flight')

function index(req, res) {
    Flight.find({}, function (err, flights) {
        if (err) {
            return console.log(err);
        }
        res.render('flights/index', { flights })
    });
}

function newFlight(req, res) {
    res.render('flights/new')
}

function create(req, res) {
    const flight = req.body;
    function setDeparts() {
        if (flight.departs !== undefined) {
            if (!flight.departs) {
                const today = new Date();
                const d = today.getDate();
                const m = today.getMonth();
                const y = today.getFullYear();
                const nextYear = new Date(y + 1, m, d);
                flight.departs = nextYear;
                return flight.departs;
            } else {
                return flight.departs
            }
        }};
    setDeparts();
    const newFlight = new Flight(req.body);
    newFlight.save(function (err) {
        if (err) return res.render('flights/new');
        console.log(newFlight);
        res.redirect('/flights');
    });
}

module.exports = {
    index,
    new: newFlight,
    create
}