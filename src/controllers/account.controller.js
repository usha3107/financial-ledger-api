const service = require("../services/account.service");

exports.createAccount = async (req, res) => {
  try {
    const account = await service.createAccount(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: "Failed to create account" });
  }
};
