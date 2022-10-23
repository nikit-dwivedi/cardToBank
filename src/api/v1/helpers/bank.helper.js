const { bankFormatter } = require("../formatter/form.format");
const { responseFormater } = require("../formatter/response.format");
const bankModel = require("../models/bank.model");

exports.addBank = async (userId, bodyData) => {
    try {
        const formatData = bankFormatter(userId, bodyData)
        if (!formatData) {
            return responseFormater(false, "please provide all parameter", {})
        }
        const addData = new bankModel(formatData);
        await addData.save()
        return responseFormater(true, "bank added successfully", {})
    } catch (error) {
        return responseFormater(false, error.message, {})
    }
}

exports.getBankByUserId = async (userId) => {
    try {
        const bankData = await bankModel.find({ userId })
        return bankData[0] ? responseFormater(true, "bank List", bankData) : responseFormater(false, "please add bank first", {})
    } catch (error) {
        return responseFormater(false, error.message, {});
    }
}

exports.getBankByBankId = async (userId, bankId) => {
    try {
        const bankData = await bankModel.findOne({ userId, bankId })
        return bankData ? responseFormater(true, "bank Details", bankData) : responseFormater(false, "please add bank first", {})
    } catch (error) {
        return responseFormater(false, error.message, {});
    }
}

exports.editBankByUserId = async (bankId, bodyData) => {
    try {
        const { bank_name, name_on_account, account_number, ifsc_code, ...garbage } = bodyData
        let garbageCheck = Object.entries(garbage)
        if (garbageCheck[0]) {
            return responseFormater(false, "please provide valid data", {})
        }
        const bankCheck = await bankModel.exists({ bankId });
        if (!bankCheck) {
            return responseFormater(false, "please add bank first");
        }
        await bankModel.findOneAndUpdate({ userId }, bodyData)
        return responseFormater(true, "bank updated", {})
    } catch (error) {
        return responseFormater(false, error.message, {});
    }
}