const { randomBytes } = require('node:crypto');
require('dotenv').config()

module.exports = {
    bankFormatter: (userId, bodyData) => {
        const { contact_id, bank_name, payment_mode, fund_account_id, name_on_account, account_number, ifsc_code } = bodyData
        if (!contact_id || !bank_name || !payment_mode || !fund_account_id || !name_on_account || !account_number || !ifsc_code) {
            return false
        }
        const bankId = randomBytes(4).toString('hex')
        return {
            bankId,
            userId,
            contact_id,
            bank_name,
            payment_mode,
            fund_account_id,
            name_on_account,
            account_number,
            ifsc_code,
        }
    },
    transactionFormatter: (userId, bodyData) => {
        const { bankId, pay, charge } = bodyData
        if (!bankId || !pay || !charge) {
            return false
        }
        const transactionId = randomBytes(4).toString('hex')
        const settlement = `${process.env.SETTLEMENT} Days`
        const fee = Math.floor(((process.env.FEE * parseInt(pay)) / 100) + 1)
        const gst = Math.floor(((process.env.GST * parseInt(pay)) / 100) + 1)
        const date = formatDate()
        const time = formatTime()
        const status = 'pending'
        const receive = parseInt(pay) - fee - gst - parseInt(charge)
        return {
            transactionId,
            userId,
            pay,
            receive,
            settlement,
            bankId,
            fee,
            gst,
            charge,
            date,
            time,
            status,
        }
    }
}
function distanceCalculator(lon1, lat1, lon2, lat2) {
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return parseFloat((c * r).toFixed(1));
}


function formatTime() {
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    let indainDate = ISTTime.toLocaleString().replace(",", "")
    let newData = indainDate.split(" ");
    let timeSplit = newData[1].split(':')
    if (timeSplit[0] < 10) {
        timeSplit[0] = `0${timeSplit[0]}`
    }
    let returnData = `${timeSplit[0]}:${timeSplit[1]} ${newData[2].toLocaleUpperCase()}`
    return returnData
}
function formatDate() {
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330;

    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    let indainDate = ISTTime.toDateString().split(" ")
    return `${indainDate[1]} ${indainDate[2]} ${indainDate[3]}`
}