const express = require("express");
const router = express.Router();
const controller = require("../controllers/transaction.controller");

router.post("/deposits", controller.deposit);
router.post("/withdrawals", controller.withdraw);

module.exports = router;
