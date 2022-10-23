const { addBank, editBankByUserId, getBankByUserId, getBankByBankId } = require("../helpers/bank.helper")
const { success, badRequest, unknownError } = require("../helpers/response_helper")
const { parseJwt } = require("../middlewares/authToken")

exports.addNewBank = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization)
        const { status, message, data } = await addBank(token.userId, req.body)
        return status ? success(res, message) : badRequest(res, message)
    } catch (error) {
        return unknownError(res, error.message)
    }
}

exports.editBankDetails = async (req, res) => {
    try {
        const { bankId } = req.params
        const { status, message, data } = await editBankByUserId(bankId, req.body)
        return status ? success(res, message) : badRequest(res, message)
    } catch (error) {
        return unknownError(res, error.message)
    }
}

exports.getAllBank = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization)
        const { status, message, data } = await getBankByUserId(token.userId)
        return status ? success(res, message, data) : badRequest(res, message)
    } catch (error) {
        return unknownError(res, error.message)
    }
}

exports.getBank = async (req, res) => {
    try {
        const { bankId } = req.params
        const token = parseJwt(req.headers.authorization)
        const { status, message, data } = await getBankByBankId(token.userId,bankId)
        return status ? success(res, message, data) : badRequest(res, message)
    } catch (error) {
        return unknownError(res, error.message)
    }
}