const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
        default: function () {
            const today = new Date();
            const d = today.getDate();
            const m = today.getMonth();
            const y = today.getFullYear();
            const nextYear = new Date(y + 1, m, d)
            return nextYear
        }
    }
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);

