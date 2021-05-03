const Flight = require('../models/flight')

function index(req, res) {
    Flight.find({}, function (err, flights) {
        if (err) {
            return console.log(err);
        }
        res.render('flights/index', {
            title: "List of All Flights",
            flights
        })
    }).sort("departs");
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    const addAYear = dt.getFullYear() + 1;
    const setNewYear = dt.setFullYear(addAYear);
    const departsDate = dt.toISOString().slice(0, 16);
    console.log("DT:", dt);
    console.log("departsDate:", departsDate);
    res.render('flights/new', {
        title: "Add a new flight",
        departsDate
    })
}

function create(req, res) {
    const flight = req.body;
    console.log("rec.body:", flight)
    if (!flight.departs) {
        const today = new Date();
        const d = today.getDate();
        const m = today.getMonth();
        const y = today.getFullYear();
        const nextYear = new Date(y + 1, m, d);
        flight.departs = nextYear;
    };
    const newFlight = new Flight(req.body);
    newFlight.save(function (err) {
        if (err) return res.render('flights/new');
        console.log(newFlight);
        res.redirect('/flights');
    });
}

function show(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    Flight.findById(req.params.id, function (err, flight) {
        res.render('flights/show', {
            title: "Flight details",
            flight,
            departsDate
        })
    })
}

module.exports = {
    index,
    new: newFlight,
    create,
    show
}