const pool = require("../config/db");

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

module.exports = { createAccount };
