const { getBalance } = require("../repositories/ledger.repo");

async function getAccount(accountId) {
  const account = await pool.query(
    "SELECT * FROM accounts WHERE id = $1",
    [accountId]
  );

  const balance = await getBalance(accountId);

  return {
    ...account.rows[0],
    balance,
  };
}
