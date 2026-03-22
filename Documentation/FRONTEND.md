# Frontend Architecture Guide

Detailed documentation for the frontend architecture following Clean Architecture principles.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.x | Static site generator |
| React | 19.x | Interactive UI components |
| TailwindCSS | 4.x | Styling |
| TypeScript | 5.x | Type safety |

## Directory Structure

```
Frontend/src/
├── core/
│   └── entities/
│       └── types.ts          # Domain types (Article, Project, User, etc.)
│
├── infrastructure/
│   └── api/
│       └── api-client.ts    # API client with methods (get, post, put, delete)
│
├── presentation/
│   ├── components/           # React components
│   │   ├── Hero.tsx         # Hero section with tech stack
│   │   ├── TechStackShowcase.tsx  # Tech stack display
│   │   ├── ProjectsShowcase.tsx   # Projects grid with data fetching
│   │   ├── ArticlesShowcase.tsx   # Articles grid with data fetching
│   │   ├── About.tsx         # About section
│   │   ├── Contact.tsx       # Contact section with social links
│   │   └── index.ts          # Explicit component exports
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro # Main layout wrapper
│   │
│   └── pages/
│       ├── index.astro       # Homepage
│       ├── blog/
│       │   ├── index.astro   # Blog listing
│       │   └── [slug].astro  # Blog post detail
│       └── projects/
│           └── index.astro   # Projects listing
│
├── shared/
│   ├── constants/
│   │   └── config.ts         # App constants (API endpoints, config)
│   │
│   └── utils/
│       └── helpers.ts       # Utility functions (cn, formatDate, slugify, truncate)
│
└── styles/
    └── globals.css           # Global styles with TailwindCSS
```

## Explicit Exports (No Barrel Exports)

Following the project's requirement for explicit imports, all modules export directly:

### ❌ Avoid (Barrel Export)
```typescript
// index.ts
export * from './types';
```

### ✅ Use (Explicit Export)
```typescript
// types.ts
export interface Article { ... }
```

### Import Examples

```typescript
// Entity types
import type { Article, Project } from '../../core/entities/types';

// API client
import { apiClient } from '../../infrastructure/api/api-client';

// Components
import { Hero } from '../components/Hero';

// Utilities
import { formatDate, cn } from '../../shared/utils/helpers';

// Constants
import { API_ENDPOINTS, APP_CONFIG } from '../../shared/constants/config';
```

## React Components

### Data Fetching

Components use React hooks for data fetching:

```typescript
import { useEffect, useState } from 'react';
import { apiClient } from '../../infrastructure/api/api-client';
import type { Project } from '../../core/entities/types';

export function ProjectsShowcase({ limit = 6 }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await apiClient.get<Project[]>('/projects?featured=true');
        setProjects(data.slice(0, limit));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [limit]);

  // ... render logic
}
```

### Client Directives

In Astro, use client directives for React components:

```astro
---
import { Hero } from '../components/Hero';
import { ProjectsShowcase } from '../components/ProjectsShowcase';
---

<Hero client:load />

<ProjectsShowcase client:visible limit={3} />
```

| Directive | Usage |
|-----------|-------|
| `client:load` | Load immediately (above the fold) |
| `client:visible` | Load when visible in viewport |
| `client:idle` | Load when browser is idle |
| `client:only` | Client-side only (no SSR) |

## API Client

The API client handles all HTTP requests:

```typescript
import { apiClient } from '../../infrastructure/api/api-client';

// GET request
const articles = await apiClient.get<Article[]>('/articles');

// POST request with auth
const response = await apiClient.post<AuthResponse>('/auth/login', credentials, token);

// PUT request
const updated = await apiClient.put<Article>('/articles/123', data, token);

// DELETE request
await apiClient.delete('/articles/123', token);
```

## TailwindCSS Configuration

TailwindCSS v4 uses CSS-first configuration:

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary-50: #f0f9ff;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

@utility btn {
  @apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors;
}

@utility btn-primary {
  @apply btn bg-primary-500 text-white hover:bg-primary-600;
}

@utility card {
  @apply rounded-xl border border-gray-200 bg-white shadow-sm;
}
```

## Building for Production

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Type Checking

```bash
# Astro type check
npm run typecheck

# Check specific files
npx astro check src/presentation/pages/index.astro
```