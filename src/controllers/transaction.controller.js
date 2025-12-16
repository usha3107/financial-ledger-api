const service = require("../services/transaction.service");

/**
 * DEPOSIT CONTROLLER
 */
async function deposit(req, res) {
  try {
    const result = await service.deposit(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Deposit failed" });
  }
}

/**
 * WITHDRAW CONTROLLER
 */
async function withdraw(req, res) {
  try {
    const result = await service.withdraw(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err.message === "INSUFFICIENT_FUNDS") {
      return res.status(422).json({ error: "Insufficient funds" });
    }
    res.status(500).json({ error: "Withdrawal failed" });
  }
}

/**
 * TRANSFER CONTROLLER
 */
async function transfer(req, res) {
  try {
    const result = await service.transfer(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err.message === "INSUFFICIENT_FUNDS") {
      return res.status(422).json({ error: "Insufficient funds" });
    }
    res.status(500).json({ error: "Transfer failed" });
  }
}

module.exports = {
  deposit,
  withdraw,
  transfer,
};
