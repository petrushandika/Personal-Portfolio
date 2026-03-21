# Product Requirements Document (PRD) - Personal Portfolio CMS

## 1. Product Overview

### 1.1 Product Name
Personal Portfolio dengan Integrated CMS

### 1.2 Product Description
Platform portfolio personal modern dengan Content Management System terintegrasi untuk publikasi artikel SEO-friendly dan showcase project.

### 1.3 Target Users
- **Primary**: Portfolio Owner (Developer/Professional)
- **Secondary**: Visitors/Recruiters/Potential Clients

### 1.4 Product Goals
- Menampilkan personal branding profesional
- Platform publikasi artikel teknis
- Showcase project portfolio lengkap
- SEO optimization untuk organic traffic
- Admin experience yang seamless untuk content management

## 2. Functional Requirements

### 2.1 Public Pages (Frontend)

#### 2.1.1 Landing Page
**Requirements:**
- Hero section dengan headline dan CTA
- About section dengan bio dan foto
- Experience timeline
- Skills showcase
- Featured projects
- Latest articles
- Contact form
- Footer dengan links sosial

**Acceptance Criteria:**
- Responsive design (mobile-first)
- Smooth scroll navigation
- Animations pada scroll
- Meta tags untuk SEO

#### 2.1.2 Blog/Articles Page
**Requirements:**
- List artikel dengan pagination
- Filter by category/tag
- Search functionality
- Sort by date/popularity

**Acceptance Criteria:**
- Pagination 10 artikel per page
- Search debounce 300ms
- URL params untuk filter state

#### 2.1.3 Article Detail Page
**Requirements:**
- Full article content (Markdown/MDX)
- Author info
- Publication date
- Reading time estimate
- Tags/Categories
- Share buttons
- Related articles
- Syntax highlighting

**Acceptance Criteria:**
- SEO-friendly URL (/blog/[slug])
- Open Graph meta tags
- Table of contents (auto-generated)
- Code copy button

#### 2.1.4 Project Detail Page
**Requirements:**
- Project description
- Tech stack badges
- Screenshots/Gallery
- Live demo link
- GitHub repository link
- Challenges & solutions

**Acceptance Criteria:**
- Image optimization (lazy loading)
- Responsive image gallery
- External links open in new tab

### 2.2 Admin Dashboard (Protected)

#### 2.2.1 Authentication
**Requirements:**
- Login form (email/password)
- JWT dengan refresh token
- Session management
- Logout functionality

**Acceptance Criteria:**
- Password validation (min 8 chars, complexity)
- Rate limiting (5 attempts per 15 min)
- Token refresh otomatis
- Secure cookie handling

#### 2.2.2 Article Management
**Requirements:**
- Create new article
- Edit existing article
- Delete article (soft delete)
- Draft/Published status
- Auto-save draft
- Preview before publish
- SEO fields (meta title, description, keywords)
- Featured image upload

**Acceptance Criteria:**
- Slug auto-generate dari judul
- Validasi judul unik
- Image upload max 5MB
- Form validation real-time
- Auto-save setiap 30 detik

#### 2.2.3 Project Management
**Requirements:**
- Create new project
- Edit project details
- Delete project
- Upload multiple screenshots
- Tech stack selection
- Order/Priority management

**Acceptance Criteria:**
- Image gallery dengan drag-drop reorder
- Validasi semua required fields
- Tech stack dari predefined list

#### 2.2.4 Media Library
**Requirements:**
- Upload images
- Browse uploaded files
- Delete files
- Copy URL to clipboard

**Acceptance Criteria:**
- Support format: JPG, PNG, WebP, GIF
- Max file size: 5MB per file
- Thumbnail generation
- Search/filter files

### 2.3 Backend API

#### 2.3.1 Authentication Endpoints
```
POST   /auth/login          # Login dengan credentials
POST   /auth/refresh        # Refresh access token
POST   /auth/logout         # Logout dan invalidate token
GET    /auth/me             # Get current user info
```

#### 2.3.2 Articles Endpoints
```
GET    /articles            # List artikel (public)
GET    /articles/:slug      # Detail artikel (public)
POST   /articles            # Create artikel (protected)
PUT    /articles/:id        # Update artikel (protected)
DELETE /articles/:id        # Delete artikel (protected)
```

#### 2.3.3 Projects Endpoints
```
GET    /projects            # List projects (public)
GET    /projects/:slug      # Detail project (public)
POST   /projects            # Create project (protected)
PUT    /projects/:id        # Update project (protected)
DELETE /projects/:id        # Delete project (protected)
```

#### 2.3.4 Media Endpoints
```
POST   /media/upload        # Upload file (protected)
GET    /media               # List files (protected)
DELETE /media/:id           # Delete file (protected)
```

## 3. Non-Functional Requirements

### 3.1 Performance
- **Page Load Time**: < 2 detik (First Contentful Paint)
- **Time to Interactive**: < 3.5 detik
- **API Response Time**: < 200ms (p95)
- **Static Assets**: CDN delivery

### 3.2 Security
- **Authentication**: JWT dengan refresh token rotation
- **Authorization**: Role-based access control
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: Input sanitization, CSP headers
- **CSRF Protection**: Token-based untuk mutations
- **Rate Limiting**: 100 requests per 15 minutes (public), 1000 (authenticated)

### 3.3 Scalability
- **Database**: Connection pooling
- **Caching**: Redis untuk session dan query cache
- **CDN**: Static assets caching
- **Horizontal Scaling**: Stateless backend

### 3.4 SEO
- **Meta Tags**: Dynamic untuk setiap page
- **Structured Data**: JSON-LD (Article, Person, WebSite)
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Configured properly
- **Canonical URLs**: No duplicate content
- **Open Graph**: Tags untuk social sharing

### 3.5 Accessibility
- **WCAG 2.1 Level AA** compliance
- **Keyboard Navigation**: Full support
- **Screen Reader**: ARIA labels
- **Color Contrast**: Minimum 4.5:1
- **Focus Indicators**: Visible focus states

### 3.6 Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 4. Data Requirements

### 4.1 Database Entities

#### User
- id (UUID, PK)
- email (string, unique)
- password_hash (string)
- role (enum: admin)
- created_at (timestamp)
- updated_at (timestamp)

#### Article
- id (UUID, PK)
- slug (string, unique)
- title (string)
- excerpt (text)
- content (text)
- featured_image (string, nullable)
- status (enum: draft, published)
- meta_title (string, nullable)
- meta_description (text, nullable)
- author_id (UUID, FK)
- published_at (timestamp, nullable)
- created_at (timestamp)
- updated_at (timestamp)

#### Project
- id (UUID, PK)
- slug (string, unique)
- title (string)
- description (text)
- content (text, nullable)
- tech_stack (array of strings)
- github_url (string, nullable)
- live_url (string, nullable)
- images (array of strings)
- featured (boolean)
- order (integer)
- created_at (timestamp)
- updated_at (timestamp)

#### RefreshToken
- id (UUID, PK)
- user_id (UUID, FK)
- token_hash (string)
- expires_at (timestamp)
- created_at (timestamp)

#### AuditLog
- id (UUID, PK)
- user_id (UUID, FK, nullable)
- action (string)
- entity_type (string)
- entity_id (UUID, nullable)
- metadata (json, nullable)
- ip_address (string)
- user_agent (string)
- created_at (timestamp)

## 5. User Interface Requirements

### 5.1 Design System
- **Typography**: Inter (headings), System UI (body)
- **Colors**: Dark mode primary (modern professional)
- **Spacing**: 4px base grid system
- **Components**: Consistent button, input, card styles
- **Animations**: Framer Motion untuk smooth transitions

### 5.2 Layout
- **Max Width**: 1200px (content), full-width (hero)
- **Padding**: Consistent 16px (mobile), 24px (tablet), 32px (desktop)
- **Navigation**: Fixed header with smooth scroll
- **Footer**: Full-width dengan links organized

### 5.3 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 6. Integration Requirements

### 6.1 External Services
- **Database**: PostgreSQL (Neon/Supabase)
- **Cache**: Redis (Upstash)
- **Storage**: Cloudinary/AWS S3 untuk images
- **Email**: Resend/SendGrid (untuk contact form)
- **Deployment**: Vercel (frontend), Railway/Render (backend)

### 6.2 Third-Party Libraries
- **Frontend**: Astro, React, TailwindCSS, Framer Motion
- **Backend**: NestJS, Drizzle ORM
- **Auth**: Jose (JWT), Argon2 (password hashing)
- **Validation**: Zod
- **Testing**: Vitest, Playwright

## 7. Success Criteria

### 7.1 Technical Metrics
- Lighthouse Performance Score: > 90
- Lighthouse Accessibility Score: > 90
- Lighthouse Best Practices Score: > 90
- Lighthouse SEO Score: > 95
- API Uptime: 99.9%
- Zero critical security vulnerabilities

### 7.2 User Experience Metrics
- Time on Page: > 2 minutes (article pages)
- Bounce Rate: < 50%
- Pages per Session: > 2
- Contact Form Conversion: > 5%

### 7.3 SEO Metrics
- Google Indexing: < 1 minggu setelah deploy
- Organic Traffic Growth: 20% per bulan (target)
- Backlinks: 10+ dalam 3 bulan pertama

## 8. Risks and Mitigation

### 8.1 Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Performance issues | High | Optimize images, implement caching, use CDN |
| Security vulnerabilities | High | Regular audits, dependency updates, input validation |
| Database scaling | Medium | Proper indexing, connection pooling, query optimization |
| Third-party service downtime | Low | Fallback strategies, graceful degradation |

### 8.2 Project Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | Medium | Strict MVP definition, prioritize features |
| Learning curve | Low | Use familiar technologies, comprehensive documentation |
| Time constraints | Medium | Agile approach, regular progress tracking |

## 9. Future Enhancements

### Phase 2
- Multi-language support (i18n)
- Newsletter subscription system
- Comment system dengan moderation
- Advanced analytics dashboard

### Phase 3
- Real-time notifications
- AI-powered content suggestions
- Integration dengan headless CMS (Sanity/Contentful)
- Mobile app (React Native)

## 10. Appendix

### 10.1 Reference Websites
- **Sevenpreneur.com**: Design inspiration, modern professional layout
- **AbuSaid.netlify.app**: Content structure, blog integration

### 10.2 Technical Stack
Lihat dokumentasi STACK.md untuk detail lengkap.

### 10.3 Architecture
Lihat dokumentasi ARCHITECTURE.md untuk detail arsitektur.
