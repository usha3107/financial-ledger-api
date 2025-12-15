const service = require("../services/transaction.service");

exports.transfer = async (req, res) => {
  try {
    const result = await service.transfer(req.body);
    res.status(200).json(result);
  } catch (err) {
    if (err.message === "INSUFFICIENT_FUNDS") {
      return res.status(422).json({ error: "Insufficient funds" });
    }
    res.status(500).json({ error: "Transfer failed" });
  }
};
