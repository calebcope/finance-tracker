# API Reference

This document describes the high-level API contract for the Finance Tracker backend. All routes are prefixed with `/api` and expect/return JSON unless stated otherwise.

## Authentication

### POST /auth/register
- **Body**: `{ "email": "user@example.com", "password": "securePass123", "firstName": "Ada" }`
- **Responses**:
  - `201`: `{ "userId": "uuid", "email": "user@example.com" }`
  - `400`: Validation error details from Zod

### POST /auth/login
- **Body**: `{ "email": "user@example.com", "password": "securePass123" }`
- **Responses**:
  - `200`: `{ "accessToken": "jwt", "refreshToken": "jwt", "expiresIn": 3600 }`
  - `401`: Invalid credentials message

### POST /auth/refresh
- **Body**: `{ "refreshToken": "jwt" }`
- **Responses**:
  - `200`: Returns a new access token
  - `401`: Refresh token invalid/expired

## Transactions

### GET /transactions
- **Query params**: `startDate`, `endDate`, `category`, `type`, `page`, `limit`
- **Responses**:
  - `200`: `{ "data": [Transaction], "pagination": { ... } }`

### POST /transactions
- **Body**: `{ "amount": 45.67, "type": "expense", "categoryId": "uuid", "date": "2024-11-01", "note": "Groceries" }`
- **Responses**:
  - `201`: Newly created transaction record
  - `400`: Validation error details

### PATCH /transactions/:transactionId
- Partial updates allowed using JSON body
- `200`: Updated transaction

### DELETE /transactions/:transactionId
- `204`: Transaction deleted

## Categories

### GET /categories
- Returns the user-specific category list grouped by type

### POST /categories
- **Body**: `{ "label": "Housing", "type": "expense", "color": "#E57373" }`

### PATCH /categories/:categoryId
- Updates metadata (label, color, icon, type)

### DELETE /categories/:categoryId
- Soft delete unless `hard=true` query param is present

## Analytics & Dashboard

### GET /analytics/summary
- Aggregates spend/income totals by month, includes running balance

### GET /analytics/categories
- Returns data ready for pie/bar charts per category

### GET /analytics/cashflow
- Rolling 90-day trend line aggregation

## Health & Misc

### GET /health
- Used for uptime monitoring; returns service/version/build info

---

### Shared Schemas (Prisma / Drizzle)
- `Transaction`: `id`, `userId`, `amount`, `type`, `categoryId`, `date`, `note`, timestamps
- `Category`: `id`, `userId`, `label`, `type`, `icon`, `color`, timestamps
- `User`: `id`, `email`, `passwordHash`, `firstName`, `lastName`, `roles`, timestamps

All mutation inputs are validated with Zod before hitting the service layer. Prisma client handles transactional writes; errors bubble up through a standard error handler middleware.
