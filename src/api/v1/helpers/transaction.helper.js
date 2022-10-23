const { transactionFormatter } = require("../formatter/form.format");
const { responseFormater } = require("../formatter/response.format");
const bankModel = require("../models/bank.model");
const transactionModel = require("../models/transaction.model");

exports.addtransaction = async (userId, bodyData) => {
    try {
        const formatData = transactionFormatter(userId, bodyData)
        if (!formatData) {
            return responseFormater(false, "please provide all parameter", {})
        }
        const bankCheck = await bankModel.exists({ bankId: bodyData.bankId })
        if (!bankCheck) {
            return responseFormater(false, "Bank not found", {})
        }
        const addData = new transactionModel(formatData);
        await addData.save()
        return responseFormater(true, "transaction added successfully", {})
    } catch (error) {
        return responseFormater(false, error.message, {})
    }
}

exports.getTransactionByUserId = async (userId) => {
    try {
        const transactionData = await transactionModel.find({ userId })
        return transactionData ? responseFormater(true, "transaction List", transactionData) : responseFormater(false, "no transaction found", {})
    } catch (error) {
        return responseFormater(false, error.message, {});
    }
}

exports.getTransactionByTransactionId = async (userId, transationId) => {
    try {
        const transactionData = await transactionModel.findOne({ userId, transationId })
        return transactionData ? responseFormater(true, "transaction details", transactionData) : responseFormater(false, "no transaction found", {})
    } catch (error) {
        return responseFormater(false, error.message, {});
    }
}

exports.edittransactionByUserId = async (userId, bodyData) => {
    try {
        const { transaction_name, name_on_account, account_number, ifsc_code, ...garbage } = bodyData
        let garbageCheck = Object.entries(garbage)
        if (garbageCheck[0]) {
            return responseFormater(false, "please provide valid data", {})
        }
        const transactionCheck = await transactionModel.exists({ userId });
        if (!transactionCheck) {
            return responseFormater(false, "please add transaction first");
        }
        await transactionModel.findOneAndUpdate({ userId }, bodyData)
        return responseFormater(true, "transaction updated", {})
    } catch (error) {
        return responseFormater(false, error.message, {});
    }
}