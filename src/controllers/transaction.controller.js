const service = require("../services/transaction.service");

// DEPOSIT CONTROLLER
const deposit = async (req, res) => {
  try {
    const result = await service.deposit(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Deposit failed" });
  }
};

// WITHDRAW CONTROLLER
const withdraw = async (req, res) => {
  try {
    const result = await service.withdraw(req.body);
    res.status(201).json(result);
  } catch (err) {
    if (err.message === "INSUFFICIENT_FUNDS") {
      return res.status(422).json({ error: "Insufficient funds" });
    }
    res.status(500).json({ error: "Withdrawal failed" });
  }
};

module.exports = {
  deposit,
  withdraw,
};
