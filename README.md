# Financial Ledger API

A backend API built using **Node.js, Express, and PostgreSQL** that implements a
**ledger-based financial system** following **double-entry bookkeeping**.

---

## Implemented Features

- Account creation
- Deposit money into accounts
- Withdraw money with balance validation
- Transfer money between accounts
- Double-entry bookkeeping (debit and credit)
- Balance calculated from ledger entries
- Ledger history for each account
- ACID-compliant database transactions
- Overdraft prevention
- Immutable (append-only) ledger records

---

## Technology Used

- Node.js
- Express
- PostgreSQL
- pg
- dotenv

---

## Project Structure

financial-ledger-api/  
├── src/  
│   ├── app.js  
│   ├── server.js  
│   ├── config/  
│   │   └── db.js  
│   ├── routes/  
│   │   ├── account.routes.js  
│   │   └── transaction.routes.js  
│   ├── controllers/  
│   │   ├── account.controller.js  
│   │   └── transaction.controller.js  
│   ├── services/  
│   │   ├── account.service.js  
│   │   └── transaction.service.js  
│   └── repositories/  
│       └── ledger.repo.js  
├── .env  
├── package.json  
└── README.md  

---

## Business Rules

- Account balance is not stored in the database
- Balance is calculated from ledger entries
- Ledger entries cannot be updated or deleted
- Withdrawals and transfers are blocked if balance is insufficient
- Transfers generate one debit and one credit entry
- All financial operations are executed inside database transactions

---

## API Endpoints

### Accounts
- POST /accounts  
- GET /accounts/{accountId}  
- GET /accounts/{accountId}/ledger  

### Transactions
- POST /deposits  
- POST /withdrawals  
- POST /transfers  

---

## Balance Calculation Logic

SUM(  
&nbsp;&nbsp;CASE  
&nbsp;&nbsp;&nbsp;&nbsp;WHEN entry_type = 'credit' THEN amount  
&nbsp;&nbsp;&nbsp;&nbsp;ELSE -amount  
&nbsp;&nbsp;END  
)

---

## Running the Project

npm install  
npx nodemon src/server.js  

Server runs on:  
http://localhost:3000  

---

## Summary

This project demonstrates a **ledger-based financial system** where balances are
derived from immutable ledger entries, ensuring correctness, consistency, and
auditability.
