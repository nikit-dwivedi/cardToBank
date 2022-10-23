const express = require("express");
const router = express.Router();


const transactionController = require('../controllers/transaction.controller')

router.get('/', transactionController.getAllTransactions)
router.get('/:transactionId',transactionController.getTransaction)
router.post('/', transactionController.addNewTransaction)


module.exports = router;
