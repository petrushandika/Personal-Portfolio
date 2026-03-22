# Architecture Documentation - Personal Portfolio CMS

## Overview

This document describes the clean architecture implementation for a Personal Portfolio CMS with separated Frontend and Backend within a single repository.

## Repository Structure

```mermaid
graph TD
    subgraph Root["Root Directory"]
        subgraph Frontend["Frontend/ (Astro)"]
            FE_SRC["src/"]
            FE_CORE["core/ - Domain logic"]
            FE_INFRA["infrastructure/ - API clients"]
            FE_PRES["presentation/ - UI components"]
            FE_SHARED["shared/ - Utils, types"]
            FE_PUBLIC["public/ - Static assets"]
            FE_CONFIG["package.json, astro.config.mjs"]
        end
        
        subgraph Backend["Backend/ (NestJS)"]
            BE_SRC["src/"]
            BE_DOMAIN["domain/ - Entities, interfaces"]
            BE_APP["application/ - Use cases"]
            BE_INFRA["infrastructure/ - DB, cache"]
            BE_INTERFACE["interface/ - Controllers"]
            BE_DRIZZLE["drizzle/ - Schema, migrations"]
            BE_CONFIG["package.json, tsconfig.json"]
        end
        
        DOCS["Documentation/"]
        README["README.md"]
    end

    style Frontend fill:#61dafb,color:#000
    style Backend fill:#e0234e,color:#fff
    style Documentation fill:#f0db4f,color:#000
```

## Clean Architecture Layers

### Dependency Rule

```mermaid
flowchart TB
    subgraph Interface["4. Interface Layer (Outermost)"]
        Controllers["Controllers"]
        Guards["Guards"]
        Pipes["Pipes"]
        Filters["Filters"]
    end
    
    subgraph Infrastructure["3. Infrastructure Layer"]
        Repositories["Repository Implementations"]
        External["External Services"]
        Database["Database Access"]
    end
    
    subgraph Application["2. Application Layer"]
        UseCases["Use Cases"]
        DTOs["DTOs"]
    end
    
    subgraph Domain["1. Domain Layer (Innermost)"]
        Entities["Entities"]
        Interfaces["Repository Interfaces"]
        ValueObjects["Value Objects"]
    end

    Interface --> Infrastructure
    Interface --> Application
    Infrastructure -->|implements| Application
    Application -->|uses| Domain
    Infrastructure -->|implements| Domain

    style Domain fill:#4caf50,color:#fff
    style Application fill:#ff9800,color:#fff
    style Infrastructure fill:#2196f3,color:#fff
    style Interface fill:#9c27b0,color:#fff
```

### Backend Architecture Detail

```mermaid
graph TB
    subgraph Interface["interface/ (Controllers, Guards)"]
        AUTH_CTRL["AuthController"]
        ARTICLE_CTRL["ArticleController"]
        PROJECT_CTRL["ProjectController"]
        CATEGORY_CTRL["CategoryController"]
        HEALTH_CTRL["HealthController"]
        JWT_GUARD["JwtAuthGuard"]
        THROTTLE_GUARD["ThrottlerGuard"]
        EXCEPTION_FILTER["HttpExceptionFilter"]
    end

    subgraph Application["application/ (Use Cases, DTOs)"]
        AUTH_USECASE["Auth UseCases"]
        ARTICLE_USECASE["Article UseCases"]
        PROJECT_USECASE["Project UseCases"]
        CATEGORY_USECASE["Category UseCases"]
        DTOS["Validated DTOs (class-validator)"]
    end

    subgraph Infrastructure["infrastructure/ (Implementations)"]
        USER_REPO["UserRepository"]
        ARTICLE_REPO["ArticleRepository"]
        PROJECT_REPO["ProjectRepository"]
        CATEGORY_REPO["CategoryRepository"]
        AUDIT_REPO["AuditLogRepository"]
        CACHE["CacheService / NullCacheService"]
        JWT_SVC["JwtService"]
        HASH_SVC["PasswordService"]
    end

    subgraph Domain["domain/ (Pure TypeScript)"]
        USER_ENTITY["User Entity"]
        ARTICLE_ENTITY["Article / ArticleWithAuthor"]
        PROJECT_ENTITY["Project Entity"]
        CATEGORY_ENTITY["Category Entity"]
        AUDIT_ENTITY["AuditLog Entity"]
        I_USER_REPO["IUserRepository"]
        I_ARTICLE_REPO["IArticleRepository"]
        I_PROJECT_REPO["IProjectRepository"]
        I_CATEGORY_REPO["ICategoryRepository"]
    end

    Interface --> Application
    Application --> Domain
    Infrastructure -->|implements| Domain
    Application -->|uses| Infrastructure

    style Domain fill:#4caf50,color:#fff
    style Application fill:#ff9800,color:#fff
    style Infrastructure fill:#2196f3,color:#fff
    style Interface fill:#9c27b0,color:#fff
```

### Frontend Architecture Detail

```mermaid
graph TB
    subgraph Presentation["presentation/"]
        PAGES["pages/ - Astro Pages"]
        COMPONENTS["components/ - React Components"]
        HOOKS["hooks/ - Custom Hooks"]
        LAYOUTS["layouts/ - Page Layouts"]
    end

    subgraph Infrastructure["infrastructure/"]
        API_CLIENT["ApiClient"]
        AUTH_STORAGE["AuthStorage"]
        QUERY_CLIENT["TanStack Query"]
    end

    subgraph Core["core/ (Pure TypeScript)"]
        ARTICLE_ENTITY["Article Entity"]
        PROJECT_ENTITY["Project Entity"]
        I_ARTICLE_REPO["IArticleRepository"]
        I_PROJECT_REPO["IProjectRepository"]
    end

    Presentation --> Core
    Infrastructure -->|implements| Core
    Presentation -->|uses| Infrastructure
    Presentation -->|uses| Core

    style Core fill:#4caf50,color:#fff
    style Infrastructure fill:#2196f3,color:#fff
    style Presentation fill:#61dafb,color:#000
```

## Authentication Architecture

### Token Flow

```mermaid
sequenceDiagram
    participant Client
    participant Frontend
    participant Backend
    participant Redis
    participant Database

    Client->>Frontend: Enter credentials
    Frontend->>Backend: POST /auth/login
    
    Backend->>Database: Find user by email
    Database-->>Backend: User data
    
    Backend->>Backend: Verify password (Argon2)
    
    alt Invalid Credentials
        Backend-->>Frontend: 401 Unauthorized
        Frontend-->>Client: Show error
    else Valid Credentials
        Backend->>Backend: Generate JWT access token
        Backend->>Backend: Generate refresh token
        Backend->>Redis: Store refresh token hash
        Backend-->>Frontend: Access token + Set-Cookie
        Frontend-->>Client: Redirect to dashboard
    end
```

### Token Refresh Flow

```mermaid
sequenceDiagram
    participant Client
    participant Frontend
    participant Backend
    participant Redis

    Client->>Frontend: API request
    Frontend->>Backend: Request + Access Token
    Backend->>Backend: Validate JWT
    
    alt Token Expired
        Backend-->>Frontend: 401 Unauthorized
        Frontend->>Backend: POST /auth/refresh
        Backend->>Redis: Lookup refresh token
        Redis-->>Backend: Token data
        Backend->>Backend: Verify token
        Backend->>Redis: Invalidate old token
        Backend->>Backend: Generate new token pair
        Backend->>Redis: Store new refresh token
        Backend-->>Frontend: New access token
        Frontend->>Backend: Retry original request
    else Token Valid
        Backend->>Backend: Process request
    end
    
    Backend-->>Frontend: Response
    Frontend-->>Client: Display data
```

### JWT Token Structure

```mermaid
classDiagram
    class AccessToken {
        +string sub (userId)
        +string email
        +string role
        +number iat
        +number exp
        +string iss
        +string aud
    }

    class RefreshToken {
        +string token (random)
        +string tokenHash
        +string userId
        +Date expiresAt
        +string deviceInfo
    }

    class RedisSession {
        +string tokenHash
        +string userId
        +Date createdAt
        +number ttl
    }
```

## API Design Principles

### REST Endpoints Structure

```mermaid
graph LR
    subgraph Auth["/auth"]
        LOGIN["POST /login"]
        REGISTER["POST /register"]
        REFRESH["POST /refresh"]
        LOGOUT["POST /logout"]
        ME["GET /me"]
    end

    subgraph Articles["/articles"]
        LIST["GET /"]
        GET["GET /:slug"]
        CREATE["POST /"]
        UPDATE["PUT /:id"]
        DELETE["DELETE /:id"]
    end

    subgraph Projects["/projects"]
        LIST_P["GET /"]
        GET_P["GET /:slug"]
        CREATE_P["POST /"]
        UPDATE_P["PUT /:id"]
        DELETE_P["DELETE /:id"]
    end

    subgraph Categories["/categories"]
        LIST_C["GET /"]
        GET_C["GET /:slug"]
        CREATE_C["POST /"]
        UPDATE_C["PUT /:id"]
        DELETE_C["DELETE /:id"]
    end

    subgraph Health["/health"]
        HEALTH_CHECK["GET /"]
    end
```

### Request/Response Flow

```mermaid
flowchart TD
    A[Client Request] --> B{Authentication Required?}
    
    B -->|No| C[Public Endpoint]
    B -->|Yes| D[Include Bearer Token]
    
    D --> E{Token Valid?}
    E -->|No| F[Return 401]
    E -->|Yes| G[Check Permissions]
    
    G -->|No| H[Return 403]
    G -->|Yes| C
    
    C --> I{Validation Pass?}
    I -->|No| J[Return 400]
    I -->|Yes| K[Execute Use Case]
    
    K --> L{Operation Success?}
    L -->|No| M[Return Error]
    L -->|Yes| N[Format Response]
    
    J --> O[Error Response Format]
    F --> O
    H --> O
    M --> O
    N --> P[Success Response Format]
    
    O["{success: false, error: {...}}"]
    P["{success: true, data: {...}}"]
```

## Static Site Generation Strategy

### Astro Build Process

```mermaid
flowchart TD
    A[git push] --> B[GitHub Actions Trigger]
    
    B --> C[Install Dependencies]
    C --> D[Type Check]
    D --> E[Lint Check]
    
    E --> F[Build Frontend]
    F --> G[Fetch Articles from API]
    G --> H[Generate Static Pages]
    
    H --> I[Optimize Images]
    I --> J[Generate Sitemap]
    J --> K[Deploy to Vercel]
    
    B --> L[Build Backend]
    L --> M[Run Migrations]
    M --> N[Deploy to Railway]
    
    K --> O[Production Live]
    N --> O
```

### Hybrid Rendering Strategy

```mermaid
graph LR
    subgraph Static["Static Generation (SSG)"]
        LANDING["Landing Page"]
        ABOUT["About Page"]
        PROJECTS["Projects Page"]
        BLOG_LIST["Blog Listing"]
        BLOG_POST["Blog Posts"]
    end

    subgraph Server["Server-Side (SSR)"]
        ADMIN["Admin Dashboard"]
        LOGIN["Login Page"]
    end

    subgraph Client["Client-Side (React Islands)"]
        CONTACT_FORM["Contact Form"]
        SEARCH["Search"]
        COMMENT["Comments"]
    end
```

## Security Architecture

### Defense in Depth

```mermaid
flowchart TB
    subgraph Network["Network Layer"]
        HTTPS["HTTPS Only"]
        CDN["CDN + DDoS Protection"]
        WAF["Web Application Firewall"]
    end

    subgraph Application["Application Layer"]
        CORS["CORS Configuration"]
        RATE_LIMIT["Rate Limiting"]
        VALIDATION["Input Validation (Zod)"]
        CSRF["CSRF Tokens"]
    end

    subgraph Data["Data Layer"]
        PARAMETERIZED["Parameterized Queries"]
        HASHING["Password Hashing (Argon2)"]
        ENCRYPT["Encryption at Rest"]
    end

    subgraph Auth["Authentication Layer"]
        JWT["JWT Tokens"]
        HTTPONLY["HttpOnly Cookies"]
        REFRESH["Refresh Token Rotation"]
    end

    Network --> Application
    Application --> Data
    Application --> Auth

    style Network fill:#f44336,color:#fff
    style Application fill:#ff9800,color:#fff
    style Data fill:#4caf50,color:#fff
    style Auth fill:#2196f3,color:#fff
```

### Security Headers

```mermaid
classDiagram
    class SecurityHeaders {
        +Content-Security-Policy
        +X-Frame-Options: DENY
        +X-Content-Type-Options: nosniff
        +Strict-Transport-Security
        +X-XSS-Protection
        +Referrer-Policy
    }
```

## Database Architecture

### Connection Flow

```mermaid
flowchart LR
    subgraph App["Application"]
        API["API Server"]
    end

    subgraph Pool["Connection Pool"]
        P1["Connection 1"]
        P2["Connection 2"]
        P3["Connection 3"]
        PN["Connection N"]
    end

    subgraph DB["PostgreSQL"]
        REPLICA["Read Replica"]
        PRIMARY["Primary"]
    end

    API --> Pool
    Pool -->|Read| REPLICA
    Pool -->|Write| PRIMARY

    style Pool fill:#2196f3,color:#fff
    style DB fill:#4caf50,color:#fff
```

### Caching Strategy

```mermaid
flowchart TD
    subgraph Request["Client Request"]
        USER["User"]
    end

    subgraph Cache["Redis Cache"]
        SESSION["Session Store"]
        QUERY["Query Cache"]
        RATE["Rate Limiter"]
    end

    subgraph DB["Database"]
        PG["PostgreSQL"]
    end

    USER -->|1. Request| CHECK{Cache Hit?}
    CHECK -->|Yes| RETURN["Return Cached"]
    CHECK -->|No| DB
    DB -->|2. Query| PG
    PG -->|3. Store| CACHE["Cache Data"]
    CACHE -->|4. Return| RETURN

    SESSION -->|Token Validation| CHECK
    RATE -->|Rate Check| CHECK

    style Cache fill:#ff9800,color:#fff
    style DB fill:#4caf50,color:#fff
```

## Testing Architecture

### Test Pyramid

```mermaid
flowchart TB
    subgraph E2E["E2E Tests (Playwright)"]
        USER_FLOW["User Flows"]
        LOGIN_FLOW["Login Flow"]
        ARTICLE_CRUD["Article CRUD"]
    end

    subgraph Integration["Integration Tests (Supertest)"]
        API_ENDPOINT["API Endpoints"]
        DB_INTEGRATION["Database Integration"]
    end

    subgraph Unit["Unit Tests (Vitest)"]
        DOMAIN["Domain Logic"]
        USE_CASE["Use Cases"]
        UTILITIES["Utilities"]
    end

    E2E --> Integration
    Integration --> Unit

    style E2E fill:#f44336,color:#fff
    style Integration fill:#ff9800,color:#fff
    style Unit fill:#4caf50,color:#fff
```

## Deployment Architecture

### Production Infrastructure

```mermaid
flowchart LR
    subgraph Client["Client"]
        BROWSER["Browser"]
    end

    subgraph CDN["CDN / Edge"]
        VERCEL["Vercel Edge Network"]
    end

    subgraph Frontend["Frontend (Vercel)"]
        SSG["Static Site"]
        ISR["On-Demand Revalidation"]
    end

    subgraph Backend["Backend (Railway)"]
        API["API Server"]
        WORKERS["Background Workers"]
    end

    subgraph Data["Data Layer"]
        NEON["Neon PostgreSQL"]
        UPSTASH["Upstash Redis"]
        CLOUDINARY["Cloudinary"]
    end

    BROWSER -->|HTTPS| VERCEL
    VERCEL -->|Static Assets| SSG
    VERCEL -->|API Calls| API
    API -->|Read/Write| NEON
    API -->|Cache/Session| UPSTASH
    API -->|Media| CLOUDINARY

    style Frontend fill:#61dafb,color:#000
    style Backend fill:#e0234e,color:#fff
    style Data fill:#4caf50,color:#fff
    style CDN fill:#9c27b0,color:#fff
```

## Technology Stack Mapping

```mermaid
graph TD
    subgraph Frontend["Frontend Stack"]
        FE_ASTRO["Astro 5.x"]
        FE_REACT["React 19"]
        FE_TAILWIND["TailwindCSS 3.4"]
        FE_MOTION["Framer Motion"]
        FE_QUERY["TanStack Query 5"]
        FE_ZUSTAND["Zustand 5"]
    end

    subgraph Backend["Backend Stack"]
        BE_NEST["NestJS 10.x"]
        BE_DRIZZLE["Drizzle ORM"]
        BE_JOSE["Jose (JWT)"]
        BE_ARGON2["Argon2"]
        BE_ZOD["Zod"]
        BE_PINO["Pino"]
    end

    subgraph Data["Data Stack"]
        POSTGRES["PostgreSQL 16"]
        REDIS["Redis 7"]
    end

    subgraph DevOps["DevOps"]
        DOCKER["Docker"]
        GHA["GitHub Actions"]
        HUSKY["Husky"]
    end

    Frontend -->|HTTP| Backend
    Backend -->|ORM| Data
    Backend -->|Cache| Data

    style Frontend fill:#61dafb,color:#000
    style Backend fill:#e0234e,color:#fff
    style Data fill:#4caf50,color:#fff
    style DevOps fill:#9c27b0,color:#fff
```

## Naming Conventions

```mermaid
classDiagram
    class NamingConventions {
        +Files: kebab-case
        +Classes: PascalCase
        +Interfaces: PascalCase (I prefix)
        +Functions: camelCase
        +Constants: UPPER_SNAKE_CASE
        +Boolean: is/has/should prefix
    }

    class FileExamples {
        +user.repository.ts
        +ArticleCard.tsx
        +auth.service.ts
        +API_ENDPOINTS.ts
        +isLoading: boolean
    }
```

## Import Organization

```mermaid
flowchart LR
    subgraph Order["Import Order"]
        N1["1. External Libraries"]
        N2["2. Internal (@/)"]
        N3["3. Relative (../)"]
    end

    subgraph Examples["Examples"]
        E1["import { eq } from 'drizzle-orm'"]
        E2["import { Button } from '@/components'"]
        E3["import { formatDate } from './utils'"]
    end

    N1 --> E1
    N2 --> E2
    N3 --> E3

    style N1 fill:#f44336,color:#fff
    style N2 fill:#ff9800,color:#fff
    style N3 fill:#4caf50,color:#fff
```

## Scalability Considerations

### Horizontal Scaling

```mermaid
flowchart TB
    subgraph LB["Load Balancer"]
        NGINX["Nginx"]
    end

    subgraph Servers["API Servers"]
        S1["Server 1"]
        S2["Server 2"]
        S3["Server N"]
    end

    subgraph Shared["Shared State"]
        REDIS["Redis Cluster"]
        PG["PostgreSQL"]
    end

    LB --> S1
    LB --> S2
    LB --> S3

    S1 --> Shared
    S2 --> Shared
    S3 --> Shared

    style LB fill:#9c27b0,color:#fff
    style Servers fill:#2196f3,color:#fff
    style Shared fill:#4caf50,color:#fff
```

### Performance Targets

```mermaid
graph LR
    subgraph Metrics["Performance Metrics"]
        FCP["FCP < 1.8s"]
        LCP["LCP < 2.5s"]
        TTI["TTI < 3.5s"]
        CLS["CLS < 0.1"]
        API["API < 200ms"]
    end
```
