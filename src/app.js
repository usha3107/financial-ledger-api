const express = require("express");
const accountRoutes = require("./routes/account.routes");
const transactionRoutes = require("./routes/transaction.routes");

const app = express();
app.use(express.json());

app.use("/accounts", accountRoutes);
app.use("/", transactionRoutes);

module.exports = app;
