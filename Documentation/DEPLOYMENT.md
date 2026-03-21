# Deployment Documentation

## Overview

This document provides deployment instructions for the Personal Portfolio CMS, covering both frontend and backend deployment to production environments.

## Infrastructure Overview

```mermaid
flowchart LR
    subgraph Client
        B[Browser]
    end
    
    subgraph CDN["CDN (Vercel)"]
        FE[Frontend Static Assets]
    end
    
    subgraph Cloud["Cloud Providers"]
        subgraph Backend["Railway/Render"]
            API[API Server]
        end
        
        subgraph Data["Data Layer"]
            PG[(PostgreSQL<br/>Neon)]
            RD[(Redis<br/>Upstash)]
        end
    end
    
    B --> FE
    FE --> API
    API --> PG
    API --> RD
```

## Prerequisites

Before deployment:

- [ ] GitHub account with repository access
- [ ] Vercel account (for frontend)
- [ ] Railway account (for backend)
- [ ] Neon account (for PostgreSQL)
- [ ] Upstash account (for Redis)

## Database Setup

### Neon PostgreSQL

1. Create new project at [Neon Console](https://console.neon.tech)
2. Copy connection string:
   ```
   postgresql://username:password@ep-xxx-xxx-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. Add to backend environment variables

### Connection Pooling

Neon provides built-in serverless driver with automatic connection pooling.

```typescript
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infrastructure/database/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
});
```

## Redis Setup

### Upstash Redis

1. Create new database at [Upstash Console](https://console.upstash.com)
2. Copy REST API URL and token
3. Add to backend environment variables

```bash
# Backend environment
REDIS_URL=redis://default:xxx@xxx.upstash.io:6379
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

## Backend Deployment

### Railway

#### 1. Connect Repository

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway init
railway link <project-id>
```

#### 2. Configure railway.toml

```toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm start"
healthcheckPath = "/health"
```

#### 3. Environment Variables

Set in Railway dashboard or via CLI:

```bash
railway variables set DATABASE_URL="postgresql://..."
railway variables set REDIS_URL="redis://..."
railway variables set JWT_SECRET="your-32-char-minimum-secret"
railway variables set JWT_REFRESH_SECRET="your-32-char-minimum-secret"
railway variables set NODE_ENV="production"
railway variables set CORS_ORIGIN="https://yourdomain.com"
```

#### 4. Deploy

```bash
# Deploy
railway up

# Check status
railway status

# View logs
railway logs
```

### Alternative: Render

1. Create new Web Service
2. Connect GitHub repository
3. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment: Node
4. Add environment variables
5. Deploy

## Frontend Deployment

### Vercel

#### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub
4. Select `portfolio/Frontend`

#### 2. Configure Project

```javascript
// frontend/vercel.json (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://api.yourdomain.com/:path*" }
  ]
}
```

#### 3. Environment Variables

Add in Vercel dashboard:

```
PUBLIC_API_URL=https://api.yourdomain.com
PUBLIC_APP_URL=https://yourdomain.com
```

#### 4. Deploy

Automatic deployment on every push to `main` branch.

### Custom Domain

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   ```
   # Type A Record
   Name: @
   Value: 76.76.21.21
   
   # Type CNAME Record
   Name: www
   Value: cname.vercel-dns.com
   ```

## Domain & SSL

### DNS Configuration

```dns
# A Record - Root domain
@          A     76.76.21.21

# CNAME - www subdomain
www        CNAME cname.vercel-dns.com

# CNAME - API subdomain (if using custom)
api        CNAME your-railway-app.railway.app
```

### SSL Certificates

- **Vercel**: Automatic Let's Encrypt certificate
- **Railway**: Automatic Let's Encrypt certificate
- **Neon**: Automatic SSL for all connections
- **Upstash**: TLS/SSL enabled by default

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths: ['Backend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
        working-directory: Backend
      
      - name: Run tests
        run: npm test
        working-directory: Backend
      
      - name: Build
        run: npm run build
        working-directory: Backend
      
      - name: Deploy to Railway
        uses: railway/cli@v2
        with:
          api-key: ${{ secrets.RAILWAY_API_KEY }}
        run: railway up --service api
```

```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths: ['Frontend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
        working-directory: Frontend
      
      - name: Lint
        run: npm run lint
        working-directory: Frontend
      
      - name: Type check
        run: npm run typecheck
        working-directory: Frontend
      
      - name: Build
        run: npm run build
        working-directory: Frontend
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: Frontend
```

### Required Secrets

Add these in GitHub repository Settings → Secrets:

| Secret | Description |
|--------|-------------|
| RAILWAY_API_KEY | Railway API token |
| VERCEL_TOKEN | Vercel access token |
| VERCEL_ORG_ID | Vercel organization ID |
| VERCEL_PROJECT_ID | Vercel project ID |

## Health Checks

### Backend Health Endpoint

```typescript
// health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private readonly db: DatabaseService,
    private readonly cacheService: CacheService,
  ) {}

  @Get()
  async check(): Promise<HealthResponse> {
    const checks = {
      database: await this.checkDatabase(),
      cache: await this.checkCache(),
      uptime: process.uptime(),
    };

    const healthy = Object.values(checks).every(
      (check) => typeof check === 'boolean' ? check : check.healthy
    );

    return {
      status: healthy ? 'healthy' : 'unhealthy',
      checks,
      timestamp: new Date().toISOString(),
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.db.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  private async checkCache(): Promise<boolean> {
    try {
      await this.cacheService.ping();
      return true;
    } catch {
      return false;
    }
  }
}
```

### Monitoring Endpoints

```
GET https://api.yourdomain.com/health
GET https://api.yourdomain.com/health/live      # Kubernetes liveness
GET https://api.yourdomain.com/health/ready     # Kubernetes readiness
```

## Rollback Procedures

### Backend Rollback (Railway)

```bash
# List recent deployments
railway deployments

# Rollback to specific deployment
railway rollback <deployment-id>
```

### Frontend Rollback (Vercel)

1. Go to Vercel Dashboard → Deployments
2. Find the working deployment
3. Click "..." menu → "Promote to Production"

## Performance Monitoring

### Recommended Services

| Service | Purpose |
|---------|---------|
| Sentry | Error tracking |
| Vercel Analytics | Frontend performance |
| Grafana | Infrastructure monitoring |
| Uptime Robot | Uptime monitoring |

### Basic Sentry Setup

```bash
# Install
npm install @sentry/astro @sentry/node
```

```typescript
// frontend/astro.config.mjs
import { sentry } from '@sentry/astro';

export default defineConfig({
  integrations: [sentry({
    dsn: import.meta.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
  })],
});
```

## Backup & Recovery

### Database Backups

Neon provides:
- Automatic daily backups
- Point-in-time recovery
- Manual backups via `pg_dump`

```bash
# Manual backup
pg_dump -Fc -f backup.dump $DATABASE_URL

# Restore
pg_restore -d $DATABASE_URL backup.dump
```

### Backup Schedule

| Data Type | Frequency | Retention |
|-----------|-----------|----------|
| Database | Daily | 30 days |
| Uploads | Weekly | 90 days |
| Logs | Monthly | 12 months |

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check backend health, restart service |
| CORS errors | Verify CORS_ORIGIN matches frontend URL |
| Database connection | Check DATABASE_URL format, SSL settings |
| Build failures | Check Node version, dependencies |
| Slow responses | Enable caching, check database indexes |

### Debug Commands

```bash
# Check Railway logs
railway logs --deployment <id>

# Test database connection
railway run psql $DATABASE_URL -c "SELECT 1"

# Check environment variables
railway variables list
```
