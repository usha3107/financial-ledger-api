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

// ✅ GET LEDGER HISTORY
const getLedger = async (req, res) => {
  try {
    const { accountId } = req.params;
    const ledger = await service.getAccountLedger(accountId);
    res.json(ledger);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ledger" });
  }
};

module.exports = {
  createAccount,
  getAccount,
  getLedger, // 👈 export added
};
