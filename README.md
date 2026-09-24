# Reclaim

**Lost and Found Management System** · CST8319 Software Development Project · Group 8

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)

Reclaim is an internal lost and found system for organizations like schools, hotels and businesses. Staff log found items, record lost-item inquiries, match the two and track returns.

The repo has two parts:

- `frontend/` is the website (React, TypeScript, Vite)
- `backend/` is the API (Java, Spring Boot, PostgreSQL)

## 🛠️ What you need

Install these first:

- [Git](https://git-scm.com/downloads)
- [Java 21](https://adoptium.net/temurin/releases/?version=21) (Eclipse Temurin)
- [Node.js 24 LTS](https://nodejs.org/) (comes with npm)
- [PostgreSQL 17](https://www.postgresql.org/download/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) for the backend
- [VS Code](https://code.visualstudio.com/) for the frontend

Commands are written for macOS, Linux and Git Bash. Where PowerShell is different, the PowerShell version comes right after.

## 💡 Recommended setup

Not required, but this is the smoothest way to work on the project:

- **VS Code on the repo root** (`reclaim/`) for frontend coding and Git. Run the frontend from VS Code's terminal inside `frontend/`.
- **IntelliJ IDEA on the `backend/` folder only** for Spring Boot coding. Opening just this folder lets IntelliJ pick up the Maven project and your `backend/.env`.

## 🚀 Getting started

### 1. Get the code

```powershell
git clone <repository URL>
cd reclaim
```

### 2. Create the database

In PostgreSQL, create an empty database called `reclaim`. You can do this in pgAdmin or with:

```sql
CREATE DATABASE reclaim;
```

That's all. The backend creates the tables for you the first time it starts.

### 3. Start the backend

Make a copy of `backend/.env.example` and name it `.env`:

```bash
cd backend
cp .env.example .env
```

PowerShell:

```powershell
cd backend
Copy-Item .env.example .env
```

Open `backend/.env` and fill in your values:

| Variable | What to put |
| --- | --- |
| `DB_URL` | Leave as is if PostgreSQL runs on your computer with the default port |
| `DB_USERNAME` / `DB_PASSWORD` | Your PostgreSQL login (often `postgres` and the password you picked when installing) |
| `JWT_SECRET` | Random text, at least 32 characters. Used to sign login tokens (generate one below) |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | The first admin account, created on the first start |
| `CORS_ALLOWED_ORIGINS` | Leave as is |

To generate a `JWT_SECRET`, run this and paste the output in as the value:

```bash
openssl rand -base64 32
```

PowerShell:

```powershell
$bytes = New-Object byte[] 32; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

> [!IMPORTANT]
> `.env` holds your passwords and is ignored by Git. Never commit it.

Now run the backend. Either:

- **IntelliJ (recommended):** with the `backend` folder open, run `BackendApplication`
- **Terminal:** from the `backend` folder, run `./mvnw spring-boot:run` (PowerShell: `.\mvnw.cmd spring-boot:run`)

On the first start it creates the tables and your admin account. The API runs at <http://localhost:8080>.

### 4. Start the frontend

In VS Code's terminal, go into `frontend`, make a copy of `.env.example` named `.env` (the default value already points at your local backend), then install and run:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

PowerShell:

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Open <http://localhost:5173>, click **Log in** and use the admin username and password from `backend/.env`. 🎉

## Everyday commands

**Frontend** (run in `frontend/`)

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the site at localhost:5173 and reloads on save |
| `npm run build` | Type-checks and builds for production |
| `npm run lint` | Checks the code with oxlint |
| `npm run format` | Formats every file with Prettier |

**Backend** (run in `backend/`)

| Command | PowerShell | What it does |
| --- | --- | --- |
| `./mvnw spring-boot:run` | `.\mvnw.cmd spring-boot:run` | Starts the API at localhost:8080 |
| `./mvnw test` | `.\mvnw.cmd test` | Runs the tests (uses the database in your `.env`) |

## How it works

### Folder layout

```
backend/src/main/
├── java/com/reclaim/backend/
│   ├── auth/        login and the current-user endpoint
│   ├── config/      security, JWT and CORS settings
│   └── user/        the User entity, repository and first-admin setup
└── resources/
    ├── application.properties
    └── db/migration/    database changes (Flyway)

frontend/src/
├── routes/          one file per page (TanStack Router)
├── components/      our components, plus shadcn/ui components in ui/
├── lib/api.ts       axios setup for calling the backend
└── auth.tsx         who is logged in
```

### Logging in

1. The login form sends the username and password to `POST /api/auth/login`.
2. The backend checks them and sends back a token (a JWT).
3. The frontend saves the token and adds it to every request after that.
4. Pages that need a login check for the user first and send you to the login page if there isn't one.

### Pages and file-based routing

The frontend uses **file-based routing** from TanStack Router. Instead of listing routes in code, every file in `frontend/src/routes/` is a page, and where the file sits decides its URL:

| File | URL |
| --- | --- |
| `routes/_public/index.tsx` | `/` |
| `routes/_public/about.tsx` | `/about` |
| `routes/login.tsx` | `/login` |
| `routes/_authenticated/dashboard.tsx` | `/dashboard` |

Names that start with `_` are layouts. They wrap the pages inside them but don't show up in the URL:

- `_public/` pages use the landing page navbar
- `_authenticated/` pages need a login and use the sidebar

TanStack Router builds `src/routeTree.gen.ts` from these files automatically while `npm run dev` is running, so never edit that file by hand.

To add a dashboard page, create a file in `_authenticated/` and add it to the sidebar list in `components/layout/nav-main.tsx`.

### Database changes

Tables are managed by Flyway using the SQL files in `backend/src/main/resources/db/migration/`. To change the database, add a new file with the next number, like `V2__create_items.sql`.

> [!WARNING]
> Never edit a migration that has already run, not even to reformat it. The backend will refuse to start. Always add a new file instead.

## 🧯 Common problems

**`'url' must start with "jdbc"`** when starting the backend
The backend can't find your `.env`. Check that `backend/.env` exists and that you opened the `backend` folder in IntelliJ, not the whole repo.

**`Migration checksum mismatch`**
A migration file was changed after it ran. Undo the change with `git checkout -- <file>`.

**Login says "Invalid username or password" with the right details**
The admin account is only created on the very first start. Changing `ADMIN_USERNAME` or `ADMIN_PASSWORD` later doesn't update it.

**The site loads but login does nothing, or shows "Something went wrong!"**
Make sure the backend is running and `frontend/.env` exists.

**`Port 8080 was already in use`**
Another copy of the backend is already running. Stop it first.

## 📚 References

These are the docs and examples this project follows.

**Backend**

- [Spring Boot reference](https://docs.spring.io/spring-boot/reference/)
- [Spring Boot: Externalized configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) (how `.env` is loaded)
- [Spring Security: Username/password authentication](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/index.html)
- [Spring Security: Password storage](https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html)
- [Spring Security: OAuth 2.0 Resource Server JWT](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html)
- [Spring Security: Authorize HTTP requests](https://docs.spring.io/spring-security/reference/servlet/authorization/authorize-http-requests.html)
- [Spring Security: CORS](https://docs.spring.io/spring-security/reference/servlet/integrations/cors.html)
- [Spring Security samples: JWT login](https://github.com/spring-projects/spring-security-samples/tree/main/servlet/spring-boot/java/jwt/login)
- [Spring Data JPA reference](https://docs.spring.io/spring-data/jpa/reference/)
- [Flyway documentation](https://documentation.red-gate.com/flyway)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

**Frontend**

- [React](https://react.dev/)
- [Vite: Env variables and modes](https://vite.dev/guide/env-and-mode)
- [TanStack Router: File-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing)
- [TanStack Router: Authenticated routes](https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes)
- [TanStack Router: Router context](https://tanstack.com/router/latest/docs/framework/react/guide/router-context)
- [shadcn/ui: Vite installation](https://ui.shadcn.com/docs/installation/vite)
- [shadcn/ui blocks](https://ui.shadcn.com/blocks) (login-01, sidebar-07)
- [shadcn-admin](https://github.com/satnaing/shadcn-admin) (layout and structure)
- [Base UI](https://base-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [axios: Instance and interceptors](https://axios-http.com/docs/interceptors)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) and [Prettier](https://prettier.io/docs/)
