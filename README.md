# Personal Finance Tracker

A full-stack learning project for tracking spending, analyzing trends, and experimenting with modern fintech/backend patterns. The stack pairs a Vite + React client with an Express + PostgreSQL API powered by Prisma/Drizzle.

## Highlights
- Secure email/password auth with JWT sessions and hashed credentials
- CRUD flows for transactions, categories, and batch imports
- Analytics-ready aggregations for monthly burn, cashflow, and category splits
- Responsive dashboard built with Tailwind, Recharts, and accessible UI patterns
- Infrastructure-friendly setup with Docker, environment examples, and docs

## Tech Stack
| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, React Router, Zustand, Axios, Recharts |
| Backend | Node.js 20, Express, Prisma/Drizzle ORM, Zod, JWT, bcrypt, cookie-parser, CORS |
| Database | PostgreSQL 16 (NeonDB/Supabase in prod, Dockerized locally) |
| Infrastructure | Vercel/Netlify (web), Render/Railway (API), Docker Compose for dev |

## Project Structure
```
finance-tracker/
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── store/
│       └── styles/
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── db/
│   │   ├── middleware/
│   │   └── utils/
│   └── tests/
├── docs/
│   ├── api.md
│   ├── architecture.md
│   └── schema-diagram.png
├── .env.example
├── docker-compose.yml
└── README.md
```

## Getting Started
1. **Clone & Install**
   ```bash
   git clone https://github.com/calebcope/finance-tracker.git
   cd finance-tracker
   npm install --prefix client
   npm install --prefix server
   ```
2. **Configure Env**
   ```bash
   cp .env.example .env
   # update secrets, database URLs, hosting origins, etc.
   ```
3. **Run with Docker (recommended)**
   ```bash
   docker compose up
   ```
   - API → http://localhost:4000
   - Web → http://localhost:5173
   - Postgres → localhost:5432 (credentials from `.env.example`)
4. **Or run manually**
   ```bash
   npm run dev --prefix server
   npm run dev --prefix client
   ```

## Available Scripts
- `npm run dev --prefix client` – start Vite dev server with hot reload
- `npm run build --prefix client` – production build artifacts
- `npm run dev --prefix server` – start Express server with nodemon/tsx (to be added)
- `npm run test --prefix server` – placeholder for Vitest/Jest

## Environment Variables
Reference `.env.example` for the complete list. Key items:
- `DATABASE_URL` & `DATABASE_SHADOW_URL` for Prisma migration targets
- `JWT_SECRET` / `JWT_REFRESH_SECRET` for signing tokens
- `CLIENT_URL` + `CORS_ORIGIN` for cross-origin config
- `VITE_API_URL` consumed by the React client

## Documentation
- [`docs/api.md`](docs/api.md) – endpoint contract + payloads
- [`docs/architecture.md`](docs/architecture.md) – layered overview and deployment notes
- [`docs/schema-diagram.png`](docs/schema-diagram.png) – placeholder ER diagram (update with your tooling)

## Roadmap
- [ ] Implement Prisma schema + migrations
- [ ] Add auth controllers + session middleware
- [ ] Ship transactions CRUD UI and analytics widgets
- [ ] Integrate SimpleFin importers for real accounts
- [ ] Harden production deployments (logging, tracing, alerts)

## Contributing
This is currently a personal R&D playground, but suggestions and issues are welcome. Open an issue describing the improvement or submit a PR following the established structure.
