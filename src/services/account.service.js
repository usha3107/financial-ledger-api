const pool = require("../config/db");
const { getBalance } = require("../repositories/ledger.repo");

// CREATE ACCOUNT
async function createAccount({ userId, accountType, currency }) {
  const result = await pool.query(
    `
    INSERT INTO accounts (user_id, account_type, currency)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [userId, accountType, currency]
  );

  return result.rows[0];
}

// GET ACCOUNT WITH BALANCE
async function getAccountById(accountId) {
  const result = await pool.query(
    "SELECT * FROM accounts WHERE id = $1",
    [accountId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const balance = await getBalance(accountId);

  return {
    ...result.rows[0],
    balance,
  };
}

module.exports = {
  createAccount,
  getAccountById,
};
