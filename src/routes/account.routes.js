const express = require("express");
const router = express.Router();

const controller = require("../controllers/account.controller");

router.post("/", controller.createAccount);

module.exports = router;
