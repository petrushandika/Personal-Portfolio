# Security Documentation

## Overview

This document outlines the security measures, best practices, and implementation details for the Personal Portfolio CMS.

## Authentication Security

### Password Hashing

All passwords are hashed using **Argon2id** algorithm.

```typescript
// Password hashing
import { argon2id, hash, verify } from 'argon2';

const hashPassword = async (password: string): Promise<string> => {
  return hash(password, {
    type: argon2id,
    memoryCost: 65536, // 64 MB
    timeCost: 3,       // 3 iterations
    parallelism: 4,    // 4 parallel threads
  });
};

const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return verify(hash, password);
};
```

### JWT Configuration

```typescript
// JWT configuration
const accessTokenConfig = {
  alg: 'RS256',  // Use RSA for better security
  exp: '15m',    // Short-lived access token
  iss: 'portfolio-api',
};

const refreshTokenConfig = {
  alg: 'RS256',
  exp: '7d',     // Longer-lived refresh token
  iss: 'portfolio-api',
};
```

### Token Storage

| Token Type | Storage | Rationale |
|------------|---------|-----------|
| Access Token | Memory (React state) | Never stored persistently |
| Refresh Token | HttpOnly Cookie | Prevents XSS attacks |
| Token Hash | Redis | Server-side validation |

## Input Validation

### Zod Schemas

All inputs are validated using Zod at the boundary layer.

```typescript
// Article creation schema
const createArticleSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title cannot exceed 255 characters'),
  slug: z.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
    .optional(),
  excerpt: z.string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(500, 'Excerpt cannot exceed 500 characters'),
  content: z.string()
    .min(10, 'Content must be at least 10 characters'),
  status: z.enum(['draft', 'published']),
  tags: z.array(z.string()).optional(),
  publishedAt: z.string().datetime().optional(),
});

export type CreateArticleDto = z.infer<typeof createArticleSchema>;
```

### SQL Injection Prevention

All database queries use parameterized queries through Drizzle ORM.

```typescript
// GOOD - Parameterized query
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, email)); // Parameterized

// BAD - String concatenation (VULNERABLE)
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

### XSS Prevention

```typescript
// Content sanitization
import DOMPurify from 'isomorphic-dompurify';

// Sanitize HTML content from user input
const sanitizeContent = (content: string): string => {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'code', 'pre', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['class'],
  });
};
```

## Security Headers

### Helmet Configuration

```typescript
// main.ts
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));
```

### CORS Configuration

```typescript
// cors.config.ts
export const corsConfig = {
  origin: process.env.CORS_ORIGIN?.split(',') || [],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Request-ID'],
  credentials: true,
  maxAge: 86400, // 24 hours
};
```

## Rate Limiting

### Implementation

```typescript
// rate-limit.config.ts
export const rateLimitConfig = {
  ttl: 15 * 60 * 1000, // 15 minutes
  limits: {
    public: 100,          // 100 requests per 15 minutes
    authenticated: 1000, // 1000 requests per 15 minutes
    auth: 5,              // 5 login attempts per 15 minutes
  },
};

// Usage in NestJS
@Injectable()
export class ThrottlerBehindProxy implements OnModuleInit {
  constructor(
    private throttlerService: ThrottlerService,
    @Inject(REQUEST) private request: Request,
  ) {}

  onModuleInit() {
    this.throttlerService.setTracker(() => this.request.ip);
  }
}
```

## Data Protection

### Audit Logging

All sensitive operations are logged.

```typescript
// audit-log.service.ts
interface AuditLogEntry {
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
}

const logAuditEvent = async (entry: AuditLogEntry): Promise<void> => {
  await db.insert(auditLogs).values({
    id: uuid(),
    ...entry,
    createdAt: new Date(),
  });
};

// Usage
await logAuditEvent({
  userId: currentUser.id,
  action: 'DELETE',
  entityType: 'article',
  entityId: article.id,
  ipAddress: request.ip,
  userAgent: request.headers['user-agent'],
});
```

### Sensitive Data Handling

```typescript
// Never log these fields
const SENSITIVE_FIELDS = [
  'password',
  'passwordHash',
  'refreshToken',
  'token',
  'secret',
  'apiKey',
];

const sanitizeForLogging = <T extends Record<string, unknown>>(
  data: T
): Partial<T> => {
  const sanitized = { ...data };
  for (const field of SENSITIVE_FIELDS) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]' as unknown as T[typeof field];
    }
  }
  return sanitized;
};
```

## Environment Security

### Required Environment Variables

```bash
# .env.example

# Database - Use strong password
DATABASE_URL=postgresql://user:STRONG_PASSWORD@host:5432/db

# JWT - Minimum 32 character secrets
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-minimum-32-characters-long

# Application
NODE_ENV=production

# CORS - Specific domains only
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

### Security Checklist

- [ ] All secrets in environment variables
- [ ] No secrets in source code
- [ ] Database password is strong (16+ chars, mixed case, numbers, symbols)
- [ ] JWT secrets are cryptographically random
- [ ] HTTPS enforced
- [ ] CORS configured for specific origins
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] Audit logging enabled
- [ ] Dependencies up to date

## Common Vulnerabilities & Mitigations

### OWASP Top 10 Coverage

| OWASP Category | Mitigation |
|----------------|------------|
| A01 Broken Access Control | JWT validation, RBAC guards |
| A02 Cryptographic Failures | Argon2, HTTPS, secure cookies |
| A03 Injection | Parameterized queries, input validation |
| A04 Insecure Design | Clean architecture, threat modeling |
| A05 Security Misconfiguration | Helmet, CORS, rate limiting |
| A06 Vulnerable Components | Regular audits, minimal dependencies |
| A07 Auth Failures | Strong passwords, token rotation |
| A08 Data Integrity | Audit logs, integrity checks |
| A09 Logging Failures | Structured logging, alerts |
| A10 SSRF | URL validation, allowlists |

## Incident Response

### Security Incident Flow

```mermaid
flowchart TD
    A[Incident Detected] --> B[Assess Severity]
    B --> C{High Severity?}
    C -->|Yes| D[Notify Security Team]
    C -->|No| E[Log and Monitor]
    D --> F[Contain Threat]
    F --> G[Investigate Root Cause]
    G --> H[Implement Fix]
    H --> I[Verify Fix]
    I --> J[Post-Incident Review]
    E --> K{Requires Escalation?}
    K -->|Yes| D
    K -->|No| L[Close Ticket]
    J --> L
```
