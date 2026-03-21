# AGENTS.md - Personal Portfolio CMS

> This file follows the AGENTS.md standard, supported by Cursor, GitHub Copilot, Codex, Aider, and other AI coding tools.

# Personal Portfolio CMS

## Project Overview

A modern Personal Portfolio with integrated CMS for SEO articles and blog posts. Features separated Frontend (Astro) and Backend (NestJS) with clean architecture.

**Architecture**: Clean Architecture with separated Frontend/Backend
**Domain**: Personal Portfolio / Content Management
**Scale**: Startup MVP

## Tech Stack

### Frontend (Astro 5.x)
- **Framework**: Astro 5.x with React 19 islands
- **Styling**: TailwindCSS 4.x
- **Animation**: Framer Motion 12.x
- **State**: Zustand 5.x (client), TanStack Query 5.x (server)
- **Icons**: Lucide React

### Backend (NestJS 11.x)
- **Framework**: NestJS 11.x
- **ORM**: Drizzle ORM 0.36.x
- **Database**: PostgreSQL 17
- **Cache**: Redis 8.x
- **Auth**: JWT (Jose 10.x) + Argon2 0.31.x
- **Validation**: Zod 3.x + class-validator

### Development Tools
- **Package Manager**: npm
- **Linter/Formatter**: Biome 2.x
- **Testing**: Vitest 2.x
- **Git Hooks**: Husky 10.x

## Setup Commands

```bash
# Install dependencies
cd Backend && npm install
cd ../Frontend && npm install

# Setup environment
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env

# Start database services
cd Backend && docker compose up -d

# Database migrations
cd Backend && npm run db:generate && npm run db:migrate

# Start development servers
cd Backend && npm run start:dev
cd ../Frontend && npm run dev
```

## Build and Development Commands

### Backend
```bash
cd Backend
npm run start:dev      # Development server
npm run build          # Production build
npm run lint           # Lint check
npm run lint:fix       # Auto-fix lint issues
npm run typecheck      # TypeScript check
npm run test           # Run tests
npm run db:generate    # Generate migrations
npm run db:migrate     # Apply migrations
npm run db:studio      # Open Drizzle Studio
```

### Frontend
```bash
cd Frontend
npm run dev            # Development server
npm run build          # Production build
npm run preview         # Preview production build
npm run lint           # Lint check
npm run lint:fix       # Auto-fix lint issues
npm run typecheck      # TypeScript check
```

## Code Style and Conventions

### Language-Specific Rules
- Use TypeScript strict mode with exactOptionalPropertyTypes
- All external data must be validated (Zod/class-validator)
- Prefer composition over inheritance
- No magic numbers - use named constants

### Naming Conventions
- **Files**: kebab-case for general files, PascalCase for components
- **Variables**: camelCase with auxiliary verbs (isLoading, hasError)
- **Functions**: camelCase, descriptive action verbs
- **Classes**: PascalCase, noun-based names
- **Constants**: UPPER_SNAKE_CASE
- **Boolean**: is/has/should prefix

### Formatting Rules
- **Indentation**: 2 spaces
- **Line Length**: 100 characters max
- **Quotes**: Single quotes in JS/TS, double quotes in HTML
- **Semicolons**: Required
- **Trailing Commas**: ES5 style
- **Comments**: Strategic documentation only

## Project Structure

```
portfolio/
├── Backend/                    # NestJS Backend
│   ├── src/
│   │   ├── domain/            # Business entities, interfaces
│   │   ├── application/       # Use cases, DTOs
│   │   ├── infrastructure/    # DB, cache, auth implementations
│   │   ├── interface/         # Controllers, guards, pipes
│   │   ├── database/          # Schema, migrations
│   │   └── shared/            # Utils, constants, types
│   ├── drizzle/              # Migration files
│   ├── package.json
│   ├── tsconfig.json
│   ├── biome.json
│   └── docker-compose.yml
│
├── Frontend/                   # Astro Frontend
│   ├── src/
│   │   ├── core/             # Entities, repository interfaces
│   │   ├── infrastructure/   # API clients, storage
│   │   ├── presentation/     # Pages, components, layouts
│   │   └── shared/           # Utils, constants, types
│   ├── public/               # Static assets
│   ├── package.json
│   ├── astro.config.mjs
│   ├── biome.json
│   └── tsconfig.json
│
├── Documentation/             # Project documentation
├── guides/                   # AI coding rules
├── biome.json               # Root Biome config
└── .husky/                  # Git hooks
```

### Architecture Patterns
- Clean Architecture for both Frontend and Backend
- Repository pattern for data access
- Service layer for business logic
- Dependency injection in Backend

## Testing Instructions

### Testing Framework
- **Unit Tests**: Vitest 2.x
- **API Testing**: Built-in NestJS testing

### Running Tests
```bash
# Backend tests
cd Backend && npm run test

# Frontend tests
cd Frontend && npm run test
```

### Test Requirements
- **Test Location**: `*.spec.ts` alongside source
- **Naming**: Match source file + `.spec.ts`
- **Mocking**: Mock external APIs, use test database

## Security Considerations

### Authentication & Authorization
- JWT-based authentication with refresh token rotation
- Argon2 for password hashing
- All protected endpoints require Bearer token

### Input Validation
- Zod schemas for frontend validation
- class-validator for backend DTOs
- Sanitize inputs to prevent XSS

### Secrets Management
- **NEVER** commit secrets, API keys, or credentials
- Use environment variables for sensitive data
- Reference: `.env.example` files

## Git Workflow and PR Process

### Branch Naming
- **Feature branches**: `feature/[description]`
- **Bug fixes**: `fix/[description]`
- **Hotfixes**: `hotfix/[description]`

### Commit Messages
Format: `type(scope): description`

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Requirements

**Before Creating PR**:
- [ ] Run `npm run lint` - all checks pass
- [ ] Run `npm run typecheck` - no errors
- [ ] Update relevant documentation

### Git Operations Safety

**Allowed Without Asking**:
- Creating commits with descriptive messages
- Creating feature branches
- Pushing to feature branches
- Creating pull requests

**Require Approval First**:
- Force pushing to main/master
- Pushing to main/master directly
- Deleting branches

## Performance Considerations

### Optimization Guidelines
1. **Clarity First**: Write readable code, then optimize
2. **Caching**: Redis for expensive query results
3. **Database**: Add indexes for frequently queried fields
4. **Pagination**: Required for list endpoints

### Performance Targets
- API endpoints: < 200ms p95
- Frontend FCP: < 1.8s
- Frontend LCP: < 2.5s

## Troubleshooting and Common Issues

### Common Gotchas
- Database connection: Ensure Docker is running
- Environment variables: Copy `.env.example` to `.env`
- Port conflicts: Check if ports 3001, 4321, 5432, 6379 are available

### Debugging
- Backend logs: pino-http in development mode
- Database queries: Use Drizzle Studio (`npm run db:studio`)

## When Stuck or Uncertain

1. **Ask clarifying questions** rather than making assumptions
2. **Propose a plan** before implementing complex changes
3. **Reference existing patterns** in the codebase
4. **Start small** - minimal solution first, then iterate
5. **Write tests first** when fixing bugs or adding features

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [NestJS Documentation](https://docs.nestjs.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [TailwindCSS](https://tailwindcss.com)
- [Biome](https://biomejs.dev)

---

**Last Updated**: 2026-03-21
**Maintained By**: Developer
**Version**: 1.0.0
