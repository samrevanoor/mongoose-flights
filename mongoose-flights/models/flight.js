const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    arrival: {
        type: Date
    }
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default() {
            const today = new Date();
            const d = today.getDate();
            const m = today.getMonth();
            const y = today.getFullYear();
            return Date.now(y + 1, m, d)
        }
    },
    destinations: [destinationSchema]

});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);

