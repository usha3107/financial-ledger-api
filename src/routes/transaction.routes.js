const express = require("express");
const router = express.Router();

const controller = require("../controllers/transaction.controller");

// DEPOSIT money
router.post("/deposits", controller.deposit);

module.exports = router;
