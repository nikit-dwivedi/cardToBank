const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankSchema = new Schema({
    bankId: {
        type: String,
        unique: true,
    },
    userId: {
        type: String,
    },
    contact_id: {
        type: String
    },
    bank_name: {
        type: String
    },
    payment_mode: {
        type: String
    },
    fund_account_id: {
        type: String
    },
    name_on_account: {
        type: String
    },
    account_number: {
        type: String
    },
    ifsc_code: {
        type: String
    }
})

const bankModel = mongoose.model('bank', bankSchema);
module.exports = bankModel;