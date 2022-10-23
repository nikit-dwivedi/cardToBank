const express = require("express");
const router = express.Router();


const bankcontroller = require('../controllers/bank.controller')

router.get('/', bankcontroller.getAllBank)
router.get('/:bankId', bankcontroller.getBank)
router.post('/', bankcontroller.addNewBank)
router.post('/update/:bankId', bankcontroller.editBankDetails)


module.exports = router;
