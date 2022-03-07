const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ca: {
        type: String,
        required: true,
        unique: true
    },
    stopLoss: {
        type: String,
        required: true
    },
    takingProfit: {
        type: String,
        required: true
    },
    amountSell: {
        type: String
    },
    buyingPrice: {
        type: String
    },
},{ timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);
