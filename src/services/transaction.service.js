const pool = require("../config/db");
const { getBalance } = require("../repositories/ledger.repo");

/**
 * DEPOSIT SERVICE
 */
function deposit({ accountId, amount, currency }) {
  return pool.connect().then(async (client) => {
    try {
      await client.query("BEGIN");

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
  });
}

/**
 * WITHDRAW SERVICE
 */
function withdraw({ accountId, amount, currency }) {
  return pool.connect().then(async (client) => {
    try {
      await client.query("BEGIN");

      const balance = await getBalance(accountId, client);
      if (Number(balance) < amount) {
        throw new Error("INSUFFICIENT_FUNDS");
      }

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
  });
}

/**
 * TRANSFER SERVICE (DOUBLE ENTRY)
 */
function transfer({ sourceAccountId, destinationAccountId, amount, currency }) {
  return pool.connect().then(async (client) => {
    try {
      await client.query("BEGIN");

      const balance = await getBalance(sourceAccountId, client);
      if (Number(balance) < amount) {
        throw new Error("INSUFFICIENT_FUNDS");
      }

      const txResult = await client.query(
        `
        INSERT INTO transactions
        (type, source_account_id, destination_account_id, amount, currency, status)
        VALUES ('transfer', $1, $2, $3, $4, 'completed')
        RETURNING id
        `,
        [sourceAccountId, destinationAccountId, amount, currency]
      );

      const transactionId = txResult.rows[0].id;

      await client.query(
        `
        INSERT INTO ledger_entries
        (account_id, transaction_id, entry_type, amount)
        VALUES ($1, $2, 'debit', $3)
        `,
        [sourceAccountId, transactionId, amount]
      );

      await client.query(
        `
        INSERT INTO ledger_entries
        (account_id, transaction_id, entry_type, amount)
        VALUES ($1, $2, 'credit', $3)
        `,
        [destinationAccountId, transactionId, amount]
      );

      await client.query("COMMIT");
      return { status: "transfer successful" };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  });
}

module.exports = {
  deposit,
  withdraw,
  transfer,
};
