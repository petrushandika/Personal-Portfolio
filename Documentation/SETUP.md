# Setup & Installation Guide

## Prerequisites

Ensure the following tools are installed:

| Tool | Version | Installation |
|------|---------|--------------|
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org) |
| npm | 8.x | `npm install -g npm` |
| Docker | 24.x | [docker.com](https://docker.com) |
| Git | 2.x | [git-scm.com](https://git-scm.com) |

## Repository Structure

```
portfolio/
├── Frontend/           # Astro + React frontend
├── Backend/            # NestJS backend
└── Documentation/      # Project documentation
```

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
# Install all dependencies for both frontend and backend
npm install

# Or install individually
cd Frontend && npm install
cd ../Backend && npm install
```

### 3. Environment Configuration

#### Backend Setup

```bash
# Navigate to backend
cd Backend

# Copy environment template
cp .env.example .env

# Edit .env with your values
nano .env
```

**Required Environment Variables:**

```bash
# .env (Backend)

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio

# Redis
REDIS_URL=redis://localhost:6379

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-minimum-32-characters-long

# Application
NODE_ENV=development
PORT=3001
API_PREFIX=api

# CORS
CORS_ORIGIN=http://localhost:4321

# Rate Limiting
RATE_LIMIT_TTL=15
RATE_LIMIT_MAX=100
```

#### Frontend Setup

```bash
# Navigate to frontend
cd Frontend

# Copy environment template
cp .env.example .env

# Edit .env with your values
nano .env
```

**Required Environment Variables:**

```bash
# .env (Frontend)

# API Configuration
PUBLIC_API_URL=http://localhost:3001/api
PUBLIC_APP_URL=http://localhost:4321
```

### 4. Database Setup

#### Option A: Docker (Recommended)

```bash
# Start PostgreSQL and Redis containers
docker compose up -d postgres redis

# Verify containers are running
docker compose ps
```

**Docker Compose Configuration:**

```yaml
# docker-compose.yml (in Backend folder)
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: portfolio-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: portfolio
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: portfolio-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:
```

#### Option B: Local PostgreSQL & Redis

Install PostgreSQL 16 and Redis 7 locally, then create the database:

```bash
# Create database
createdb portfolio

# Start Redis
redis-server
```

### 5. Database Migrations

```bash
# Navigate to backend
cd Backend

# Generate migrations from schema
npm db:generate

# Apply migrations to database
npm db:migrate

# (Optional) Open Drizzle Studio for visual editing
npm db:studio
```

### 6. Create Admin User

```bash
# Run seed script
npm db:seed

# Or create admin manually via API:
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "your-password"}'
```

### 7. Start Development Servers

```bash
# Terminal 1: Start Backend
cd Backend
npm start:dev
# Backend runs on http://localhost:3001

# Terminal 2: Start Frontend
cd Frontend
npm dev
# Frontend runs on http://localhost:4321
```

### 8. Verify Setup

```bash
# Check backend health
curl http://localhost:3001/api/health

# Check frontend
open http://localhost:4321
```

## IDE Setup

### VS Code / Cursor / Windsurf

#### Recommended Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "golang.go",
    "ms-azuretools.vscode-docker",
    "eamodio.gitlens",
    "usernamehw.errorlens"
  ]
}
```

#### Workspace Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescriptreact": "html"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Biome Configuration

```json
// biome.json (shared config)
{
  "$schema": "https://biomejs.dev/schemas/1.5.0/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "warn"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always"
    }
  }
}
```

## Git Hooks Setup

Husky is configured for Git hooks:

```bash
# Install Husky (runs automatically via prepare script)
npm prepare

# Check installed hooks
ls -la .husky/

# Expected hooks:
# - pre-commit: Lint and type check
# - commit-msg: Validate commit message format
```

### Manual Hook Setup

```bash
# Initialize Husky
npx husky init

# Add pre-commit hook
npx husky add .husky/pre-commit "npm lint && npm typecheck"

# Add commit-msg hook
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

## Testing

### Run All Tests

```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd ../Frontend
npm test
```

### Test Coverage

```bash
# Backend with coverage
cd Backend
npm test:cov

# Frontend with coverage
cd ../Frontend
npm test:cov
```

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find process using port
lsof -i :3001
lsof -i :4321

# Kill process
kill -9 <PID>
```

#### Database Connection Error

```bash
# Check PostgreSQL is running
docker compose ps

# Verify connection string
psql $DATABASE_URL -c "SELECT 1"
```

#### Node Version Mismatch

```bash
# Check Node version
node --version

# Should be 20.x.x

# If using nvm
nvm use 20
```

### Reset Development Environment

```bash
# Stop all services
docker compose down

# Remove volumes
docker compose down -v

# Remove node_modules
rm -rf node_modules
rm -rf Frontend/node_modules
rm -rf Backend/node_modules

# Fresh install
npm install

# Start fresh
docker compose up -d
cd Backend && npm db:migrate
cd ../Frontend && npm dev
```

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm dev` | Start development server |
| `npm lint` | Run linter |
| `npm typecheck` | TypeScript check |
| `npm test` | Run tests |
| `npm build` | Build for production |
| `docker compose up -d` | Start Docker services |
| `npm db:migrate` | Run database migrations |
| `npm db:studio` | Open Drizzle Studio |
