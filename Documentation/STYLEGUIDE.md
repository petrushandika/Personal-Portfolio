# Style Guide - Personal Portfolio CMS

## Overview

This style guide ensures code consistency across the Personal Portfolio CMS project. All code must follow these guidelines to maintain readability and quality.

## General Principles

Based on the Global AI Coding Rules:

1. **Problem Clarity First (PCF)**: Clarify intent before coding
2. **Simplicity First (SF)**: Choose the simplest viable solution
3. **Readability Priority (RP)**: Code must be immediately understandable
4. **Dependency Minimalism (DM)**: No new libraries without justification
5. **Industry Standards Adherence (ISA)**: Follow established conventions
6. **Strategic Documentation (SD)**: Comment only complex logic
7. **Test-Driven Thinking (TDT)**: Design code to be testable

## Language

Use **English** for all code, comments, and technical documentation.

Use **Bahasa Indonesia** only for user-facing content:
- UI labels and buttons
- Error messages for end users
- Email templates
- Marketing content

## File Organization

### Directory Structure

```
src/
├── core/                    # Business logic, no dependencies
│   ├── entities/           # Domain entities
│   ├── repositories/       # Repository interfaces
│   └── services/           # Domain services
├── infrastructure/         # External implementations
│   ├── api/               # HTTP clients
│   ├── database/           # Database implementations
│   └── storage/            # Storage implementations
├── presentation/           # UI layer
│   ├── components/        # UI components
│   ├── pages/             # Page components
│   └── hooks/             # Custom hooks
└── shared/                # Shared utilities
    ├── constants/         # Constants
    ├── types/             # Shared types
    └── utils/             # Utility functions
```

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| General files | kebab-case | `user-service.ts` |
| Components | PascalCase | `ArticleCard.tsx` |
| Test files | Match source + `.spec.ts` | `user.service.spec.ts` |
| Config files | kebab-case or conventional | `.eslintrc.js`, `biome.json` |

## TypeScript Guidelines

### Strict Mode

All TypeScript projects use strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Type Definitions

```typescript
// Interface for object shapes
interface User {
  id: string;
  email: string;
  role: 'admin';
  createdAt: Date;
}

// Type for unions and computed types
type ArticleStatus = 'draft' | 'published';
type UserRole = 'admin';

// Enum for related constants
enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}
```

### Null Safety

```typescript
// GOOD - Explicit null check
const user = await getUser(id);
if (!user) {
  throw new NotFoundException('User not found');
}
return user.name;

// BAD - Potential null error
return (await getUser(id)).name;
```

### Function Definitions

```typescript
// GOOD - Explicit return type
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// GOOD - Async function
async function fetchUser(id: string): Promise<User | null> {
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  return user || null;
}

// BAD - Implicit return type for complex functions
function processData(data) {
  return transform(data);
}
```

## Naming Conventions

### Variables and Functions

| Type | Convention | Example |
|------|-----------|---------|
| Variables | camelCase | `userName`, `isLoading` |
| Functions | camelCase | `getUserById`, `calculateTotal` |
| Boolean variables | is/has/should prefix | `isActive`, `hasPermission`, `shouldUpdate` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| Private variables | _ prefix (optional) | `_cache`, `_config` |

### Classes and Interfaces

| Type | Convention | Example |
|------|-----------|---------|
| Classes | PascalCase | `UserService`, `ArticleController` |
| Interfaces | PascalCase with I prefix (optional) | `IUserRepository` or `UserRepository` |
| Type aliases | PascalCase | `ArticleResponse`, `ApiError` |
| Enums | PascalCase, members UPPER_SNAKE | `ArticleStatus.DRAFT` |

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ArticleCard.tsx` |
| Services | camelCase | `article.service.ts` |
| Repositories | camelCase | `article.repository.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Config | kebab-case | `biome.json` |

## Import Organization

Import statements should be ordered:

```typescript
// 1. External libraries
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

// 2. Internal absolute imports (@/)
import { Button } from '@/components/ui/button';
import { Article } from '@portfolio/shared';

// 3. Relative imports
import { formatDate } from './utils';
import { UserEntity } from '../entities/user.entity';
```

## Code Formatting

### Indentation

- **2 spaces** for TypeScript/JavaScript
- **2 spaces** for HTML/JSX
- **2 spaces** for CSS/Tailwind classes

### Line Length

Maximum **100 characters** per line.

### Semicolons

Use semicolons at the end of statements.

### Quotes

- Use **single quotes** for strings in JavaScript/TypeScript
- Use **double quotes** for HTML attributes
- Use **backticks** for template literals

### Brackets

Use K&R style (opening bracket on same line):

```typescript
function myFunction() {
  if (condition) {
    doSomething();
  } else {
    doSomethingElse();
  }
}
```

## React/Component Guidelines

### Component Structure

```typescript
// ArticleCard.tsx
interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured';
  onReadMore?: (slug: string) => void;
}

export function ArticleCard({ 
  article, 
  variant = 'default',
  onReadMore 
}: ArticleCardProps) {
  const handleClick = () => {
    onReadMore?.(article.slug);
  };

  return (
    <div className={cn('card', variant === 'featured' && 'card-featured')}>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <Button onClick={handleClick}>Read More</Button>
    </div>
  );
}
```

### Hooks Rules

```typescript
// GOOD - Custom hook for reusable logic
function useArticle(slug: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug),
  });

  return { article: data, isLoading, error };
}

// GOOD - Multiple related hooks
function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const login = async () => {
    // Login logic
  };

  return { email, setEmail, password, setPassword, error, login };
}
```

## NestJS Guidelines

### Module Structure

```typescript
// auth.module.ts
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
```

### Controller Structure

```typescript
// article.controller.ts
@Controller('articles')
@ApiTags('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PaginatedResponse<Article>> {
    return this.articleService.findAll({ page, limit });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<Article> {
    return this.articleService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(dto);
  }
}
```

### Service Structure

```typescript
// article.service.ts
@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: IArticleRepository,
    private readonly cacheService: CacheService,
  ) {}

  async findAll(params: PaginationParams): Promise<PaginatedResponse<Article>> {
    const cacheKey = `articles:${JSON.stringify(params)}`;
    const cached = await this.cacheService.get(cacheKey);
    
    if (cached) {
      return JSON.parse(cached);
    }

    const result = await this.articleRepository.findAll(params);
    await this.cacheService.set(cacheKey, JSON.stringify(result), '5m');
    
    return result;
  }
}
```

## Database Guidelines

### Schema Definition (Drizzle)

```typescript
// schema.ts
import { pgTable, uuid, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  featuredImage: varchar('featured_image', { length: 500 }),
  status: varchar('status', { length: 50 }).notNull().default('draft'),
  authorId: uuid('author_id').notNull().references(() => users.id),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

### Query Building

```typescript
// GOOD - Parameterized query
const result = await db
  .select()
  .from(articles)
  .where(eq(articles.status, 'published'))
  .orderBy(desc(articles.publishedAt))
  .limit(10)
  .offset(page * limit);

// GOOD - Full-text search
const result = await db
  .select()
  .from(articles)
  .where(
    or(
      like(articles.title, `%${search}%`),
      like(articles.content, `%${search}%`)
    )
  );
```

## CSS/Tailwind Guidelines

### Utility Classes

```html
<!-- GOOD - Readable class order -->
<button class="
  inline-flex          <!-- Display -->
  items-center        <!-- Flexbox -->
  justify-center      <!-- Alignment -->
  px-4                <!-- Horizontal padding -->
  py-2                <!-- Vertical padding -->
  text-sm             <!-- Font size -->
  font-medium         <!-- Font weight -->
  text-white          <!-- Text color -->
  bg-primary-500      <!-- Background -->
  rounded-lg          <!-- Border radius -->
  hover:bg-primary-600 <!-- Hover state -->
  transition-colors   <!-- Transition -->
">
  Submit
</button>
```

### Component Classes

```typescript
// GOOD - Extract conditional classes
function getButtonClasses(variant: 'primary' | 'secondary') {
  const base = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors';
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  return cn(base, variants[variant]);
}
```

## Git Commit Messages

Format: `type(scope): description`

### Examples

```bash
# Feature
git commit -m "feat(backend): add article CRUD endpoints"

# Bug fix
git commit -m "fix(auth): resolve token refresh race condition"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor(frontend): extract shared button component"

# Testing
git commit -m "test: add unit tests for article service"

# Chores
git commit -m "chore: add Husky git hooks"
git commit -m "chore(deps): update Drizzle ORM to latest version"
```

## Testing Guidelines

### Test File Naming

```
article.service.ts           -> article.service.spec.ts
article.controller.ts        -> article.controller.spec.ts
useArticle.ts (hook)         -> useArticle.spec.ts
utils/formatDate.ts          -> utils/formatDate.spec.ts
```

### Test Structure

```typescript
describe('ArticleService', () => {
  let service: ArticleService;
  let mockRepository: jest.Mocked<IArticleRepository>;

  beforeEach(async () => {
    mockRepository = {
      findAll: jest.fn(),
      findBySlug: jest.fn(),
      create: jest.fn(),
    };

    service = new ArticleService(mockRepository);
  });

  describe('findAll', () => {
    it('should return paginated articles', async () => {
      const mockArticles = [{ id: '1', title: 'Test' }];
      mockRepository.findAll.mockResolvedValue({
        data: mockArticles,
        meta: { page: 1, limit: 10, total: 1, totalPages: 1 },
      });

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toEqual(mockArticles);
      expect(mockRepository.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it('should throw NotFoundException when no articles found', async () => {
      mockRepository.findAll.mockResolvedValue({
        data: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
      });

      await expect(service.findAll({ page: 1, limit: 10 }))
        .rejects.toThrow(NotFoundException);
    });
  });
});
```

## Documentation Comments

### When to Comment

- Complex business logic that isn't obvious
- Non-trivial algorithms
- Workarounds for known issues
- Public API documentation (JSDoc)

### When NOT to Comment

- Obvious code that explains itself
- Commented-out code (delete it)
- What the code does (the code should be self-explanatory)
- Excessive comments on simple functions

### JSDoc Example

```typescript
/**
 * Calculates reading time for an article based on word count.
 * Assumes average reading speed of 200 words per minute.
 * 
 * @param content - The article content in markdown format
 * @returns Estimated reading time in minutes
 * 
 * @example
 * const minutes = calculateReadingTime('# Hello World\n\nThis is content.');
 * // Returns: 1
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
```

## Code Review Checklist

Before submitting a pull request:

- [ ] Code follows naming conventions
- [ ] No hardcoded values (use constants)
- [ ] Error handling is comprehensive
- [ ] Tests cover edge cases
- [ ] No console.log/debug statements
- [ ] Imports are properly organized
- [ ] No commented-out code
- [ ] Functions are reasonably sized (< 30 lines)
- [ ] Files are reasonably sized (< 300 lines)
- [ ] Security considerations addressed

## Anti-Patterns to Avoid

### Magic Numbers

```typescript
// BAD
if (user.age > 18 && user.age < 65) {
  // process payment
}

// GOOD
const MINIMUM_AGE = 18;
const MAXIMUM_AGE = 65;

if (user.age >= MINIMUM_AGE && user.age <= MAXIMUM_AGE) {
  // process payment
}
```

### Deep Nesting

```typescript
// BAD
function processUser(user) {
  if (user) {
    if (user.profile) {
      if (user.profile.settings) {
        if (user.profile.settings.notifications) {
          // do something
        }
      }
    }
  }
}

// GOOD
function processUser(user) {
  if (!user?.profile?.settings?.notifications) {
    return;
  }
  // do something
}
```

### Long Functions

Split functions that exceed 30 lines into smaller, focused functions.

### God Objects

Avoid classes/modules that do too much. Use single responsibility principle.
