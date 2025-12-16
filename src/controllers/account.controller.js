const service = require("../services/account.service");

// CREATE ACCOUNT
const createAccount = async (req, res) => {
  try {
    const account = await service.createAccount(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: "Failed to create account" });
  }
};

// GET ACCOUNT BY ID
const getAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const account = await service.getAccountById(accountId);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(account);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch account" });
  }
};

module.exports = {
  createAccount,
  getAccount,
};
