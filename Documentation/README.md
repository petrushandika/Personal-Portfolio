# Personal Portfolio CMS Documentation

Comprehensive documentation for building a modern Personal Portfolio with integrated CMS.

## Table of Contents

### Getting Started
- [MVP](MVP.md) - Minimum Viable Product definition and acceptance criteria
- [PRD](PRD.md) - Product Requirements Document with detailed specifications
- [ROADMAP](ROADMAP.md) - Development phases and milestones

### Architecture & Design
- [ARCHITECTURE](ARCHITECTURE.md) - Clean architecture implementation details
- [BACKEND](BACKEND.md) - Backend Clean Architecture detailed guide
- [SCHEMA](SCHEMA.md) - Database schema with Drizzle ORM definitions
- [DESIGN](DESIGN.md) - Design system with colors, typography, and components
- [STACK](STACK.md) - Complete technology stack reference
- [WORKFLOW](WORKFLOW.md) - Git workflow, development process, and CI/CD
- [API](API.md) - REST API documentation with endpoints and examples

### Standards & Guidelines
- [STYLEGUIDE](STYLEGUIDE.md) - Code style, naming conventions, and best practices

### Operations
- [SETUP](SETUP.md) - Local development setup and installation guide
- [DEPLOYMENT](DEPLOYMENT.md) - Production deployment procedures
- [SECURITY](SECURITY.md) - Security measures and best practices

## Quick Reference

### Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend | Astro 5.x, React 19, TailwindCSS 4.x |
| Backend | NestJS 11.x, Drizzle ORM 0.36.x |
| Database | PostgreSQL 17 |
| Cache | Redis 8.x |
| Auth | JWT (Jose 10.x) + Argon2 0.31.x |
| Validation | Zod 3.x |
| Linting | Biome 2.x |
| Testing | Vitest 2.x |
| Deployment | Vercel (Frontend), Railway (Backend) |

### Project Structure

```
portfolio/
├── Frontend/              # Astro + React frontend
│   └── src/
│       ├── core/         # Domain logic
│       ├── infrastructure/ # API clients
│       └── presentation/ # UI components
├── Backend/               # NestJS backend
│   └── src/
│       ├── domain/       # Business entities
│       ├── application/  # Use cases
│       ├── infrastructure/ # Database, cache
│       └── interface/    # Controllers, guards
└── Documentation/        # This documentation
```

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/refresh` | Refresh token |
| GET | `/articles` | List articles |
| GET | `/articles/:slug` | Get article |
| POST | `/articles` | Create article (auth) |
| GET | `/projects` | List projects |
| POST | `/media/upload` | Upload file (auth) |

## Development Phases

### Phase 1: Foundation
- Project setup with npm workspaces
- Database schema and migrations
- Authentication system with JWT

### Phase 2: Core Features
- Frontend setup with Astro
- Landing page with all sections
- Blog system with Markdown support

### Phase 3: Admin & CMS
- Admin dashboard
- Article editor with auto-save
- Project management

### Phase 4: Polish & Launch
- SEO optimization
- Performance tuning
- Production deployment

## Documentation Standards

### Language Guidelines

| Content Type | Language |
|--------------|----------|
| Code and comments | English |
| Technical documentation | English |
| User-facing content | Bahasa Indonesia |

### Version Policy
- No version numbers in documentation
- No dates in development schedules
- Updates tracked via git history

## Contributing

When updating documentation:

1. Follow the naming conventions
2. Use English for technical content
3. Include code examples where relevant
4. Update table of contents if adding new files
5. Ensure diagrams are compatible with GitHub rendering (Mermaid)

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [NestJS Documentation](https://docs.nestjs.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [TailwindCSS](https://tailwindcss.com)
- [Biome](https://biomejs.dev)
