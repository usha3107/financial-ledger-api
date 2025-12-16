const pool = require("../config/db");
const { getBalance } = require("../repositories/ledger.repo");

/**
 * DEPOSIT SERVICE
 */
async function deposit({ accountId, amount, currency }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Create transaction record
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

    // Create CREDIT ledger entry
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

/**
 * WITHDRAW SERVICE
 */
async function withdraw({ accountId, amount, currency }) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Check balance
    const balance = await getBalance(accountId, client);
    if (Number(balance) < amount) {
      throw new Error("INSUFFICIENT_FUNDS");
    }

    // Create transaction record
    const txResult = await client.query(
      `
      INSERT INTO transactions
      (type, source_account_id, amount, currency, status)
      VALUES ('withdrawal', $1, $2, $3, 'completed')
      RETURNING id
      `,
      [accountId, amount, currency]
    );

    const transactionId = txResult.rows[0].id;

    // Create DEBIT ledger entry
    await client.query(
      `
      INSERT INTO ledger_entries
      (account_id, transaction_id, entry_type, amount)
      VALUES ($1, $2, 'debit', $3)
      `,
      [accountId, transactionId, amount]
    );

    await client.query("COMMIT");
    return { status: "withdrawal successful" };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  deposit,
  withdraw,
};
