const pool = require("../config/db");

// DEPOSIT SERVICE
async function deposit({ accountId, amount, currency }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // create transaction record
    const txResult = await client.query(
      `
      INSERT INTO transactions
      (type, destination_account_id, amount, currency, status)
      VALUES ('deposit', $1, $2, $3, 'completed')
      RETURNING id
      `,
      [accountId, amount, currency]
    );

    const transactionId = txResult.rows[0].id;

    // credit ledger entry
    await client.query(
      `
      INSERT INTO ledger_entries
      (account_id, transaction_id, entry_type, amount)
      VALUES ($1, $2, 'credit', $3)
      `,
      [accountId, transactionId, amount]
    );

    await client.query("COMMIT");
    return { status: "deposit successful" };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  deposit,
};
