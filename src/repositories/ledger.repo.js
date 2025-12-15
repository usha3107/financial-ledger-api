const pool = require("../config/db");

async function getBalance(accountId, client = pool) {
  const result = await client.query(
    `
    SELECT COALESCE(
      SUM(
        CASE 
          WHEN entry_type = 'credit' THEN amount
          ELSE -amount
        END
      ), 0
    ) AS balance
    FROM ledger_entries
    WHERE account_id = $1
    `,
    [accountId]
  );

  return result.rows[0].balance;
}

module.exports = { getBalance };
