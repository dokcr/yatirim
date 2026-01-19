const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    prices: { type: [Number], required: true },
    income_per_second: { type: [Number], required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('Animal', animalSchema);
