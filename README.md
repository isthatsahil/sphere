# Sphere

> A community-driven, real-time social chat application built with a modern full-stack TypeScript architecture.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Infrastructure](#infrastructure)
- [Development Setup](#development-setup)
- [Scripts](#scripts)
- [Roadmap](#roadmap)

---

## Overview

Sphere is a real-time group chat platform designed for community interaction. It provides WebSocket-based messaging, user management, and channel-based conversations at its core.

**Current Status:** Early development — infrastructure, database layer, and server scaffolding are complete. API routes, services, and frontend components are pending.

---

## Architecture

### System Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        UI["React 19 + Vite\n(ui/)"]
    end

    subgraph API["API Layer (api/)"]
        EX["Express 5 Server"]
        WS["WebSocket Server\n(pending)"]
        RT["Routes\n(pending)"]
        SV["Services\n(pending)"]
        MW["Middleware\n(Error Handler)"]
    end

    subgraph Data["Data Layer"]
        ORM["Drizzle ORM"]
        PG["PostgreSQL 16"]
    end

    UI -->|HTTP REST| EX
    UI -->|WS| WS
    EX --> RT
    RT --> SV
    SV --> ORM
    EX --> MW
    ORM --> PG
```

---

### Request Lifecycle

```mermaid
sequenceDiagram
    participant C as Client (React)
    participant E as Express Server
    participant R as Route Handler
    participant S as Service Layer
    participant D as Drizzle ORM
    participant P as PostgreSQL

    C->>E: HTTP Request
    E->>R: Route match
    R->>S: Business logic call
    S->>D: Query
    D->>P: SQL
    P-->>D: Result
    D-->>S: Typed result
    S-->>R: Response data
    R-->>E: JSON response
    E-->>C: HTTP Response

    note over E: Error middleware<br/>catches any failure
```

---

### WebSocket Flow (Planned)

```mermaid
sequenceDiagram
    participant U1 as User A
    participant WS as WebSocket Server
    participant S as Chat Service
    participant DB as PostgreSQL
    participant U2 as User B

    U1->>WS: connect + auth
    WS->>S: validate session
    U1->>WS: send message (channel_id, content)
    WS->>S: process message
    S->>DB: persist message
    DB-->>S: saved
    S-->>WS: broadcast to channel
    WS-->>U1: message ack
    WS-->>U2: new message event
```

---

### Deployment Architecture

```mermaid
graph LR
    subgraph Docker["Docker Compose (sphere_network)"]
        API["sphere-api\nnode:20-alpine\n:3000"]
        DB["sphere_db\npostgres:16-alpine\n:5432"]
        VOL[("postgres_data\nnamed volume")]
    end

    API -->|DATABASE_URL| DB
    DB --- VOL

    DEV["Developer"] -->|":3000"| API
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React | 19.2.0 |
| Frontend Build | Vite | 7.3.1 |
| Frontend Language | TypeScript | 5.9.3 |
| React Compiler | Babel Plugin (React Compiler) | enabled |
| Backend Framework | Express | 5.2.1 |
| Backend Language | TypeScript | 5.9.3 |
| Backend Runtime | Node.js | 20 (Alpine) |
| ORM | Drizzle ORM | 0.45.1 |
| Database | PostgreSQL | 16 |
| Containerization | Docker + Docker Compose | - |
| Code Quality | ESLint + Prettier | - |

---

## Project Structure

```
sphere/
├── api/                        # Backend Express API
│   ├── src/
│   │   ├── app.ts              # Express app initialization
│   │   ├── server.ts           # HTTP server entry point
│   │   ├── config/
│   │   │   └── serverConfig.ts # Port, env config via dotenv
│   │   ├── db/
│   │   │   ├── index.ts        # Drizzle + pg connection pool
│   │   │   ├── schema.ts       # Table definitions (Drizzle ORM)
│   │   │   └── migrations/     # Auto-generated SQL migrations
│   │   ├── middleware/
│   │   │   └── errorHandler.ts # Global error formatting
│   │   ├── types/
│   │   │   └── config.d.ts     # SERVER_Config interface
│   │   ├── routes/             # [pending] API route handlers
│   │   ├── services/           # [pending] Business logic
│   │   └── websocket/          # [pending] WS server setup
│   ├── Dockerfile              # Multi-stage build (builder → prod)
│   ├── docker-compose.yml      # API + PostgreSQL orchestration
│   └── drizzle.config.ts       # ORM config (schema, migrations)
│
├── ui/                         # Frontend React app
│   ├── src/
│   │   ├── main.tsx            # React root render
│   │   └── App.tsx             # Root component
│   ├── index.html              # SPA shell
│   └── vite.config.ts          # Vite + React Compiler config
│
├── LICENSE                     # MIT
└── README.md
```

---

## Data Model

### Current Schema

```mermaid
erDiagram
    TEST_TABLE {
        serial id PK
        text name
        text email UK
        timestamp created_at
    }
```

> The `test` table is a placeholder. The production schema (planned) will include:

### Planned Schema

```mermaid
erDiagram
    USERS {
        serial id PK
        text username UK
        text email UK
        text password_hash
        timestamp created_at
    }

    CHANNELS {
        serial id PK
        text name
        text description
        int created_by FK
        timestamp created_at
    }

    MESSAGES {
        serial id PK
        int channel_id FK
        int user_id FK
        text content
        timestamp created_at
    }

    CHANNEL_MEMBERS {
        int channel_id FK
        int user_id FK
        timestamp joined_at
    }

    USERS ||--o{ MESSAGES : "sends"
    USERS ||--o{ CHANNEL_MEMBERS : "joins"
    CHANNELS ||--o{ MESSAGES : "contains"
    CHANNELS ||--o{ CHANNEL_MEMBERS : "has"
    USERS ||--o{ CHANNELS : "creates"
```

---

## Infrastructure

### Docker Setup

```mermaid
graph TB
    subgraph Compose["docker-compose.yml"]
        subgraph api_service["sphere-api service"]
            A1["Image: node:20-alpine"]
            A2["Port: 3000:3000"]
            A3["Restart: always"]
            A4["Depends on: postgres (healthy)"]
        end

        subgraph pg_service["postgres service"]
            P1["Image: postgres:16-alpine"]
            P2["Port: 5432:5432"]
            P3["Health check: pg_isready"]
            P4["Volume: postgres_data"]
        end
    end

    A4 -.->|waits for healthy| P3
```

### Multi-Stage Dockerfile

```mermaid
flowchart LR
    S1["Stage 1: builder\nnode:20-alpine\n• npm ci (all deps)\n• tsc compile → dist/"]
    S2["Stage 2: production\nnode:20-alpine\n• npm ci --omit=dev\n• Copy dist/\n• USER node (non-root)\n• EXPOSE 3000"]

    S1 -->|"COPY --from=builder"| S2
```

---

## Development Setup

### Prerequisites

- Node.js 20+
- Docker + Docker Compose
- npm

### Running with Docker

```bash
cd api
docker-compose up --build
```

This starts:
- API server at `http://localhost:3000`
- PostgreSQL at `localhost:5432`

### Running Locally

**API:**
```bash
cd api
npm install
cp .env.example .env        # set DATABASE_URL
npm run dev
```

**UI:**
```bash
cd ui
npm install
npm run dev
```

---

## Scripts

### API (`api/`)

| Script | Description |
|---|---|
| `npm run dev` | Hot-reload dev server via nodemon |
| `npm run build` | Compile TypeScript → `dist/` |
| `npm start` | Run compiled production build |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run db:generate` | Generate migrations from schema |
| `npm run db:migrate` | Apply migrations |
| `npm run db:push` | Push schema directly to DB |
| `npm run db:studio` | Launch Drizzle Studio (DB GUI) |

### UI (`ui/`)

| Script | Description |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |

---

## Roadmap

```mermaid
gantt
    title Sphere Development Roadmap
    dateFormat  YYYY-MM-DD
    section Infrastructure
    Project scaffolding         :done, 2026-01-01, 2026-01-15
    Docker + DB setup           :done, 2026-01-15, 2026-02-01
    section API
    Auth routes + JWT           :active, 2026-02-01, 2026-03-01
    User & channel routes       :2026-03-01, 2026-04-01
    WebSocket server            :2026-03-15, 2026-04-15
    section Frontend
    Component library setup     :2026-03-01, 2026-04-01
    Auth UI                     :2026-04-01, 2026-04-15
    Chat UI                     :2026-04-15, 2026-05-15
    section Testing
    API integration tests       :2026-04-01, 2026-05-01
    E2E tests                   :2026-05-01, 2026-06-01
```

---

## License

MIT © 2026 Sahil Verma
