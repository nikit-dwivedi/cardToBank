const { success, badRequest, unknownError } = require("../helpers/response_helper")
const { addtransaction, getTransactionByUserId, getTransactionByTransactionId } = require("../helpers/transaction.helper")
const { parseJwt } = require("../middlewares/authToken")

exports.addNewTransaction = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization)
        const { status, message, data } = await addtransaction(token.userId, req.body)
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

exports.getAllTransactions = async (req, res) => {
    try {
        const token = parseJwt(req.headers.authorization)
        const { status, message, data } = await getTransactionByUserId(token.userId)
        return status ? success(res, message, data) : badRequest(res, message)
    } catch (error) {
        return unknownError(res, error.message)
    }
}

exports.getTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params
        const token = parseJwt(req.headers.authorization)
        const { status, message, data } = await getTransactionByTransactionId(token.userId, transactionId)
        return status ? success(res, message, data) : badRequest(res, message)
    } catch (error) {
        return unknownError(res, error.message)
    }
}