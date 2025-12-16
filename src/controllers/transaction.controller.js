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

module.exports = {
  deposit,
};
