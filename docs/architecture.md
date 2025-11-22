# Architecture Overview

## High-Level Flow
1. **Client (React + Vite + Tailwind)** renders dashboard widgets, category management, and forms.
2. **API Gateway (Express)** authenticates the request using JWT + cookies.
3. **Service Layer** orchestrates Prisma/Drizzle operations, applies business rules, and emits domain events.
4. **PostgreSQL** persists normalized data (users, transactions, categories).
5. **Background tasks (cron/queues)** can be added later for recurring imports, alerts, or enrichment.

## Layered Backend
- **Routes**: Map HTTP verbs to controller methods and apply middleware such as `authGuard`, `validate(zodSchema)`, and `rateLimiter`.
- **Controllers**: Translate request objects into typed DTOs, invoke services, and shape the HTTP response.
- **Services**: Contain domain logic (e.g., category budget limits, running balance calculations) and interact with repositories.
- **DB (Prisma/Drizzle)**: Centralizes schema definitions, migrations, and query helpers.
- **Middleware**: Authentication, logging, error handling, request validation, and CORS.
- **Utils/Common**: Shared helpers for date math, currency formatting, and response builders.

## Frontend Modules
- **Pages**: Route-level components (Dashboard, Transactions, Categories, Auth).
- **Components**: Reusable UI building blocks (charts, tables, cards).
- **Hooks**: Encapsulate data fetching and local logic such as `useTransactions` or `useAuth`.
- **Store (Zustand)**: Lightweight global store for auth/session state and filter controls.
- **API Layer (Axios)**: Centralized client with interceptors for auth headers and error handling.
- **Styles**: Tailwind base styles, design tokens, and global CSS resets.

## Deployment Targets
- **Frontend** → Vercel/Netlify static hosting.
- **Backend** → Render/Railway container.
- **Database** → Managed Postgres (Neon/Supabase) with connection pooling enabled.

## Security & Observability
- HTTPS-only traffic enforced via hosting providers.
- JWT access tokens (15m) + refresh tokens (7d) stored in HttpOnly cookies.
- Passwords hashed with bcrypt (12+ rounds).
- Helmet, CORS, and rate limiting middleware guard against common attacks.
- Structured logging (pino/winston) and request tracing via correlation IDs.
- Health checks + metrics endpoint for uptime monitors.

## Future Enhancements
- Plaid integration for auto-importing bank transactions.
- Budget targets + anomaly detection alerts.
- Multi-tenant support with organizations/households.
- Offline-friendly PWA mode for the client.
