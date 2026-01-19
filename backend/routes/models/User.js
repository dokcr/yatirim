const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    farm: [
        {
            name: String,
            amount: { type: Number, default: 0 },
            income_per_second: Number,
            image: String
        }
    ],
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
