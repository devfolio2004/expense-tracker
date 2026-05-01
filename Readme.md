# Expense Tracker (Full Stack)

## Overview

A minimal full-stack Expense Tracker designed to simulate real-world usage (retries, refreshes, unreliable networks).
Users can create, view, filter, and sort expenses while ensuring data correctness.

---

## Features

* Add expense (amount, category, description, date)
* View all expenses
* Filter by category
* Sort by date (newest first)
* Display total of visible expenses
* Idempotent API to prevent duplicate submissions

---

## Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)

---

## API

### POST `/api/expenses`

Create a new expense.

```json
{
  "amount": 200,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-05-01",
  "requestId": "unique-id"
}
```

* `requestId` ensures idempotency (prevents duplicates on retries)

---

### GET `/api/expenses`

Query params:

* `category` → filter
* `sort=date_desc` → newest first

---

## Running Locally

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Design Decisions

* **Idempotency:** Implemented using `requestId` to handle retries safely
* **Separation of concerns:** Controllers, routes, models structured clearly
* **MongoDB:** Chosen for quick setup and flexible schema

---

## Trade-offs

* No authentication
* No pagination
* Basic validation only
* No automated tests

Focused on correctness and core functionality within time constraints.

---

## Future Improvements

* Edit/Delete expenses
* Better validation (money handling)
* Pagination
* Tests
* Deployment

---

## Author

Sarthak Ayachi
