# Financial Ledger API

This is a backend API that implements a **financial ledger system** using  
**double-entry bookkeeping**. It is built with **Node.js, Express, and PostgreSQL**.

The project focuses on **data integrity**, **correct balance calculation**, and **auditability**.

---

## Features

- Create accounts
- Deposit money
- Withdraw money (no overdrafts)
- Transfer money between accounts
- Balance calculated from ledger entries
- View complete ledger history
- ACID-compliant database transactions

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- pg
- dotenv

---

## Project Structure
financial-ledger-api/
│
├── src/
│ ├── app.js
│ ├── server.js
│
│ ├── config/
│ │ └── db.js
│
│ ├── routes/
│ │ ├── account.routes.js
│ │ └── transaction.routes.js
│
│ ├── controllers/
│ │ ├── account.controller.js
│ │ └── transaction.controller.js
│
│ ├── services/
│ │ ├── account.service.js
│ │ └── transaction.service.js
│
│ └── repositories/
│ └── ledger.repo.js
│
├── .env
├── package.json
└── README.md
