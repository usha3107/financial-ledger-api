const express = require("express");
const router = express.Router();
const controller = require("../controllers/account.controller");

router.post("/", controller.createAccount);
router.get("/:accountId", controller.getAccount);
router.get("/:accountId/ledger", controller.getLedger);


module.exports = router;
