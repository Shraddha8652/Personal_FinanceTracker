const express = require("express");
const { addTransaction, getAllTransaction ,editTransaction,deleteTransaction
} = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routes
//add transaction
router.post('/add-transaction', addTransaction)
//get transaction
router.post('/get-transaction', getAllTransaction)
//edit transaction
router.post('/edit-transaction', editTransaction)
//delete transaction
router.post('/delete-transaction', deleteTransaction)

module.exports = router;