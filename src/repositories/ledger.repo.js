const pool = require("../config/db");

/**
 * CALCULATE ACCOUNT BALANCE FROM LEDGER
 */
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

/**
 * FETCH LEDGER ENTRIES FOR AN ACCOUNT
 */
async function getLedgerEntries(accountId) {
  const result = await pool.query(
    `
    SELECT
      id,
      transaction_id,
      entry_type,
      amount,
      created_at
    FROM ledger_entries
    WHERE account_id = $1
    ORDER BY created_at ASC
    `,
    [accountId]
  );

  return result.rows;
}

module.exports = {
  getBalance,
  getLedgerEntries,
};
