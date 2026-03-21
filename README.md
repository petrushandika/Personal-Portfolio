# Personal Portfolio CMS

Modern personal portfolio with integrated Content Management System (CMS) for blog and project management.

## Features

- **Portfolio Landing Page**: Professional landing page with hero, about, skills, experience, and projects sections
- **Blog System**: SEO-optimized articles with Markdown support and syntax highlighting
- **Admin Dashboard**: Full CMS for managing articles and projects
- **Custom Authentication**: Secure JWT-based authentication with refresh token rotation
- **Responsive Design**: Mobile-first, works on all devices
- **Fast Performance**: Static site generation with Astro for optimal loading times

## Tech Stack

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
| Deployment | Vercel (Frontend), Railway (Backend) | |

## Repository Structure

```
portfolio/
├── Frontend/              # Astro + React frontend
│   ├── src/
│   │   ├── core/         # Domain logic
│   │   ├── infrastructure/ # API clients
│   │   └── presentation/ # UI components
│   └── package.json
├── Backend/               # NestJS backend
│   ├── src/
│   │   ├── domain/       # Business entities
│   │   ├── application/  # Use cases
│   │   ├── infrastructure/ # Database, cache
│   │   └── interface/    # Controllers, guards
│   └── package.json
└── Documentation/          # Full documentation
```

## Quick Start

### Prerequisites

- Node.js 22 LTS
- npm 9.x
- Docker (for local database)

### Installation

```bash
# Clone repository
git clone https://github.com/username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment files
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env
```

### Database Setup

```bash
# Start PostgreSQL and Redis
docker compose -f Backend/docker-compose.yml up -d

# Run migrations
cd Backend
npm db:migrate
```

### Start Development

```bash
# Terminal 1: Backend
cd Backend
npm start:dev
# API: http://localhost:3001

# Terminal 2: Frontend
cd Frontend
npm dev
# Frontend: http://localhost:4321
```

## Documentation

For detailed documentation, see the [Documentation](./Documentation/README.md) folder:

| Document | Description |
|----------|-------------|
| [MVP](./Documentation/MVP.md) | Minimum Viable Product definition |
| [PRD](./Documentation/PRD.md) | Product Requirements Document |
| [ROADMAP](./Documentation/ROADMAP.md) | Development phases and milestones |
| [ARCHITECTURE](./Documentation/ARCHITECTURE.md) | Clean architecture details |
| [SCHEMA](./Documentation/SCHEMA.md) | Database schema |
| [DESIGN](./Documentation/DESIGN.md) | Design system (colors, typography, components) |
| [API](./Documentation/API.md) | API endpoints documentation |
| [STYLEGUIDE](./Documentation/STYLEGUIDE.md) | Code style and conventions |
| [SETUP](./Documentation/SETUP.md) | Local development setup |
| [DEPLOYMENT](./Documentation/DEPLOYMENT.md) | Production deployment guide |
| [SECURITY](./Documentation/SECURITY.md) | Security measures |
| [WORKFLOW](./Documentation/WORKFLOW.md) | Git workflow and CI/CD |

## Scripts

### Backend

```bash
cd Backend

npm start:dev      # Start development server
npm build          # Build for production
npm start          # Start production server
npm lint           # Run linter
npm test           # Run tests
npm db:generate     # Generate migrations
npm db:migrate      # Apply migrations
npm db:studio       # Open Drizzle Studio
```

### Frontend

```bash
cd Frontend

npm dev            # Start development server
npm build          # Build for production
npm preview        # Preview production build
npm lint           # Run linter
npm typecheck      # TypeScript check
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | List articles |
| GET | `/api/articles/:slug` | Get article by slug |
| POST | `/api/articles` | Create article |
| PUT | `/api/articles/:id` | Update article |
| DELETE | `/api/articles/:id` | Delete article |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List projects |
| GET | `/api/projects/:slug` | Get project by slug |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

## Environment Variables

### Backend

```bash
DATABASE_URL=postgresql://user:password@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=your-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:4321
```

### Frontend

```bash
PUBLIC_API_URL=http://localhost:3001/api
PUBLIC_APP_URL=http://localhost:4321
```

## Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Set environment variables
3. Deploy automatically on push to main

### Backend (Railway)

1. Create project on Railway
2. Connect repository
3. Set environment variables
4. Deploy

See [Deployment Documentation](./Documentation/DEPLOYMENT.md) for detailed instructions.

## Git Workflow

This project follows Conventional Commits:

```bash
# Feature branch
git checkout -b feature/article-crud

# Commit
git commit -m "feat(backend): add article CRUD endpoints"

# Push and create PR
git push -u origin feature/article-crud
```

## License

MIT License - feel free to use this template for your own portfolio.

## References

- Design inspired by [Sevenpreneur](https://www.sevenpreneur.com/)
- Content structure inspired by [Abu Said Portfolio](https://abusaid.netlify.app/)
