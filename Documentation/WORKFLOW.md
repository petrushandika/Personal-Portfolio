# Workflow Documentation - Personal Portfolio CMS

## Overview

This document describes all workflows including Git workflow, development process, authentication flow, and deployment pipeline.

## Git Workflow

### Branch Strategy

```mermaid
gitGraph
   commit id: "Initial commit"
   branch feature/auth-system
   checkout feature/auth-system
   commit id: "Add JWT authentication"
   commit id: "Add refresh token rotation"
   checkout main
   merge feature/auth-system id: "Merge auth feature"
   branch feature/article-cms
   checkout feature/article-cms
   commit id: "Create article CRUD"
   commit id: "Add markdown support"
   checkout main
   merge feature/article-cms id: "Merge CMS feature"
   branch hotfix/security-patch
   checkout hotfix/security-patch
   commit id: "Fix XSS vulnerability"
   checkout main
   merge hotfix/security-patch id: "Apply security patch"
```

### Branch Naming Convention

| Branch Type | Pattern | Example |
|------------|---------|---------|
| Feature | `feature/description` | `feature/article-management` |
| Bug Fix | `fix/description` | `fix/login-redirect-issue` |
| Hotfix | `hotfix/description` | `hotfix/security-vulnerability` |
| Documentation | `docs/description` | `docs/api-documentation` |
| Refactor | `refactor/description` | `refactor/auth-service` |

### Commit Message Convention

Format: `type(scope): description`

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:**

| Type | Description |
|------|-------------|
| `feat` | New feature implementation |
| `fix` | Bug fix |
| `docs` | Documentation changes only |
| `style` | Code style changes (formatting, no logic) |
| `refactor` | Code refactoring without feature/fix |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, configs |

**Scopes:**

| Scope | Description |
|-------|-------------|
| `frontend` | Astro/React frontend changes |
| `backend` | NestJS backend changes |
| `auth` | Authentication system |
| `api` | API endpoints |
| `db` | Database schema or migrations |
| `config` | Configuration files |

**Examples:**

```bash
# Feature commit
feat(backend): add article CRUD endpoints

Implemented create, read, update, delete operations
for articles with proper validation and authorization.

Closes #123

# Bug fix commit
fix(auth): resolve token refresh race condition

Added mutex lock to prevent concurrent refresh token
generation that was causing invalid token errors.

# Documentation commit
docs: update API documentation

Added examples for pagination parameters and
updated response format for error codes.
```

## Development Workflow

### Feature Development Process

```mermaid
flowchart TD
    A[Start: Create Feature Branch] --> B[Checkout New Branch]
    B --> C[Implement Feature]
    C --> D[Write Unit Tests]
    D --> E{Tests Pass?}
    E -->|No| F[Fix Issues]
    F --> C
    E -->|Yes| G[Run Lint & Type Check]
    G --> H{Checks Pass?}
    H -->|No| I[Fix Issues]
    I --> G
    H -->|Yes| J[Commit Changes]
    J --> K[Push to Remote]
    K --> L[Create Pull Request]
    L --> M{Code Review Passed?}
    M -->|No| N[Address Feedback]
    N --> C
    M -->|Yes| O[Merge to Main]
    O --> P[Delete Feature Branch]
    P --> Q[Deploy to Staging]
```

### Daily Development Routine

```bash
# 1. Start with updated main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes and commit
git add .
git commit -m "feat(scope): describe changes"

# 4. Push and create PR
git push -u origin feature/my-feature

# 5. After review, merge and cleanup
git checkout main
git pull origin main
git branch -d feature/my-feature
```

### Code Review Process

**Before Requesting Review:**

```bash
# Run all checks locally
npm lint
npm typecheck
npm test
npm build
```

**Review Checklist:**

- [ ] Code follows naming conventions
- [ ] No hardcoded values (use constants)
- [ ] Error handling is comprehensive
- [ ] Tests cover edge cases
- [ ] Documentation updated if needed
- [ ] No console.log/debug statements
- [ ] Security considerations addressed

## Authentication Workflow

### Login Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Redis
    participant Database

    User->>Frontend: Enter email & password
    Frontend->>Backend: POST /auth/login
    Backend->>Database: Validate credentials
    Database-->>Backend: User data
    Backend->>Backend: Verify password (Argon2)
    Backend->>Backend: Generate JWT tokens
    Backend->>Redis: Store refresh token hash
    Backend-->>Frontend: Access token + Set-Cookie
    Frontend-->>User: Redirect to dashboard
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
        Backend-->>Frontend: Response
    end
    Frontend-->>Client: Display data
```

### Logout Flow

```mermaid
flowchart LR
    A[User clicks logout] --> B[Frontend clears local storage]
    B --> C[Frontend calls /auth/logout]
    C --> D[Backend removes refresh token from Redis]
    D --> E[Backend returns success]
    E --> F[Frontend redirects to login]
```

## API Workflow

### Request/Response Cycle

```mermaid
flowchart TD
    A[Client Request] --> B{Authenticated?}
    B -->|No| C[Public Endpoint]
    B -->|Yes| D[Include Access Token]
    D --> E[Validate JWT]
    E -->|Valid| F[Process Request]
    E -->|Invalid| G[401 Error]
    C --> F
    F --> H[Business Logic]
    H --> I[Database Operation]
    I --> J[Format Response]
    J --> K[Return JSON]
    K --> L[Client Receives]
```

### Error Handling Flow

```mermaid
flowchart TD
    A[Request] --> B{Validation Pass?}
    B -->|No| C[Return 400 Bad Request]
    B -->|Yes| D{Authenticated?}
    D -->|No| E[Return 401 Unauthorized]
    D -->|Yes| F{Authorized?}
    F -->|No| G[Return 403 Forbidden]
    F -->|Yes| H{Resource Found?}
    H -->|No| I[Return 404 Not Found]
    H -->|Yes| J[Process Business Logic]
    J --> K{Operation Success?}
    K -->|No| L[Return 500 Internal Error]
    K -->|Yes| M[Return 200/201 Success]
    
    C --> N[Error Response Format]
    E --> N
    G --> N
    I --> N
    L --> N
    M --> O[Success Response Format]
    
    N[Error Response:<br/>success: false<br/>error: {code, message}]
    O[Success Response:<br/>success: true<br/>data: {...}]
```

## Deployment Workflow

### CI/CD Pipeline

```mermaid
flowchart LR
    subgraph Build
        A[Push to Branch] --> B[Run Tests]
        B --> C[Build Artifacts]
        C --> D{Lint & Type Check}
    end
    
    subgraph Quality
        D --> E[Security Scan]
        E --> F[Performance Check]
    end
    
    subgraph Deploy
        F --> G{Deploy to Staging}
        G --> H[Run E2E Tests]
        H --> I{Auto-merge<br/>if Pass?}
        I -->|Yes| J[Merge to Main]
        I -->|No| K[Notify Team]
        J --> L[Deploy to Production]
    end
```

### Environment Stages

| Environment | Trigger | Purpose |
|------------|---------|---------|
| **Local** | Manual | Development |
| **Staging** | PR Merge | Testing & Review |
| **Production** | Main Push | Live Deployment |

### Deployment Process

```bash
# Staging Deployment (Automatic)
1. Push to feature branch
2. Create PR to main
3. CI runs tests & linting
4. Auto-deploy to staging on PR merge
5. Manual QA & testing
6. Approve for production

# Production Deployment
1. Merge to main branch
2. CI runs full test suite
3. Deploy to production
4. Health checks pass
5. Monitoring enabled
6. Slack notification sent
```

## Database Migration Workflow

```mermaid
flowchart TD
    A[Make Schema Changes] --> B[Generate Migration]
    B --> C[drizzle-kit generate]
    C --> D[Review Generated SQL]
    D --> E{Changes Correct?}
    E -->|No| F[Edit Schema]
    F --> C
    E -->|Yes| G[Apply Migration]
    G --> H[drizzle-kit migrate]
    H --> I[Verify Data]
    I --> J[Deployment Complete]
```

## Testing Workflow

### Test Pyramid

```mermaid
graph TB
    A[E2E Tests<br/>Playwright] --> B[Integration Tests<br/>Supertest]
    B --> C[Unit Tests<br/>Vitest/Jest]
    C --> D[Test Coverage Target: 80%]
```

### Running Tests

```bash
# Unit tests
npm test                  # All tests
npm test --watch         # Watch mode
npm test --coverage     # With coverage report

# Specific test file
npm test auth.service.spec.ts

# Integration tests
npm test:e2e

# Before commit - run all
npm pre-commit-check
```

## Issue Tracking Workflow

### Issue Creation

```bash
# Bug Report Template
## Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Screenshots
[If applicable]

## Environment
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 20.10.0]
```

### Issue States

```mermaid
stateDiagram-v2
    [*] --> Open
    Open --> InProgress: Assigned
    InProgress --> InReview: PR Created
    InReview --> InProgress: Changes Requested
    InReview --> Done: Approved
    Done --> [*]
    Open --> Closed: Won't Fix
    Closed --> [*]
```

## Communication Workflow

### Team Communication Channels

| Channel | Purpose | Response Time |
|---------|---------|---------------|
| Slack | Quick questions | < 1 hour |
| GitHub Issues | Bug tracking | < 24 hours |
| Email | Formal communication | < 48 hours |

### Escalation Path

```mermaid
flowchart TD
    A[Issue Identified] --> B{Blocked?}
    B -->|No| C[Self-resolve]
    B -->|Yes| D[Ask in Team Channel]
    D --> E{Resolved?}
    E -->|No| F[Escalate to Lead]
    E -->|Yes| G[Document Solution]
    F --> H{Complex?}
    H -->|No| I[Pair Programming]
    H -->|Yes| J[Schedule Design Review]
    I --> G
    J --> K[Solve Together]
    K --> G
```

## Security Workflow

### Security Review Process

```mermaid
flowchart TD
    A[Code Change] --> B{Security Sensitive?}
    B -->|No| C[Normal Review]
    B -->|Yes| D[Security Review Required]
    D --> E[Check OWASP Top 10]
    E --> F{Risks Found?}
    F -->|Yes| G[Address Security Issues]
    G --> H[Re-review]
    H --> C
    F -->|No| C
    C --> I[Approve & Merge]
```

### Security Checklist

- [ ] Input validation on all user data
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] CSRF tokens on mutations
- [ ] Secure password storage (Argon2)
- [ ] HTTPS only
- [ ] Rate limiting configured
- [ ] Secrets not in code
- [ ] Dependencies audited
- [ ] Security headers set
