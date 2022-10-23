const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    transactionId: {
        type: String,
        unique: true
    },
    userId: {
        type: String
    },
    pay: {
        type: String
    },
    receive: {
        type: String
    },
    settlement: {
        type: String
    },
    bankId: {
        type: String
    },
    fee: {
        type: String
    },
    gst: {
        type: String
    },
    charge: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    status: {
        type: String
    }
})

const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;
