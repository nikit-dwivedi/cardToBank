const express = require("express");
const router = express.Router();

require("../v1/config/mongodb");

const bankRoute = require('./routes/bank.route.js')
const transactionsRouter= require('./routes/transaction.route')
const { authenticateUser } = require("./middlewares/authToken");

router.use('/bank', authenticateUser, bankRoute)
router.use('/transaction',authenticateUser,transactionsRouter)


module.exports = router;
