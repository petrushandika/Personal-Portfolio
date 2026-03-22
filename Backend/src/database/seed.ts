import 'reflect-metadata';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required. Check your .env file.');
}

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle(pool, { schema });

async function seed() {
  // eslint-disable-next-line no-console
  console.log('🌱 Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required. Check your .env file.');
  }

  const hashedPassword = await import('argon2').then((argon2) => argon2.hash(adminPassword));
  
  // Create admin user
  const [adminUser] = await db
    .insert(schema.users)
    .values({
      email: adminEmail,
      passwordHash: hashedPassword,
      name: 'Petrus Handika',
      role: 'admin',
    })
    .returning();

  if (!adminUser) {
    throw new Error('Failed to create admin user');
  }

  // eslint-disable-next-line no-console
  console.log('✅ Created admin user:', adminUser.email);

  // Create categories
  const [webDevCategory] = await db
    .insert(schema.categories)
    .values({
      name: 'Web Development',
      slug: 'web-development',
      description: 'Articles about web development technologies and best practices',
      color: '#6366f1',
    })
    .returning();

  const [tutorialCategory] = await db
    .insert(schema.categories)
    .values({
      name: 'Tutorial',
      slug: 'tutorial',
      description: 'Step-by-step guides and tutorials',
      color: '#10b981',
    })
    .returning();

  await db
    .insert(schema.categories)
    .values({
      name: 'Career',
      slug: 'career',
      description: 'Career tips and professional development',
      color: '#f59e0b',
    });

  // eslint-disable-next-line no-console
  console.log('✅ Created categories');

  // Create sample project
  await db
    .insert(schema.projects)
    .values({
      slug: 'personal-portfolio',
      title: 'Personal Portfolio',
      description: 'A modern personal portfolio website built with Astro, React, and NestJS',
      content: '# Personal Portfolio\n\nThis is my personal portfolio website showcasing my projects and blog posts.\n\n## Tech Stack\n\n- **Frontend**: Astro 5.x, React 19, TailwindCSS 4.x\n- **Backend**: NestJS 10.x, Drizzle ORM, PostgreSQL\n- **Cache**: Redis 8.x\n- **Authentication**: JWT with Refresh Token Rotation\n\n## Features\n\n- ⚡ Lightning fast with Astro SSG\n- 🎨 Beautiful UI with TailwindCSS\n- 🔐 Secure admin CMS\n- 📱 Fully responsive',
      techStack: ['Astro', 'React', 'NestJS', 'PostgreSQL', 'Redis', 'TailwindCSS'],
      techStackIcons: [
        { name: 'Astro', icon: 'astro' },
        { name: 'React', icon: 'reactjs' },
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'TailwindCSS', icon: 'tailwindcss' },
      ],
      githubUrl: 'https://github.com/petrushandika/Personal-Portfolio',
      liveUrl: 'https://yourportfolio.com',
      images: [],
      thumbnail: null,
      featured: true,
      order: 1,
      metaTitle: 'Personal Portfolio - Modern Full Stack Website',
      metaDescription: 'A high-performance personal portfolio built with Astro, React, NestJS, and PostgreSQL featuring a CMS admin panel.',
    });

  // eslint-disable-next-line no-console
  console.log('✅ Created sample project');

  // Create sample articles
  await db
    .insert(schema.articles)
    .values({
      slug: 'welcome-to-my-portfolio',
      title: 'Welcome to My Portfolio',
      excerpt: 'Welcome to my personal portfolio website. Here you can find information about me, my projects, and my blog posts.',
      content: '# Welcome to My Portfolio\n\nI\'m Petrus Handika, a Full-Stack Developer passionate about building beautiful, functional web applications.\n\n## What You\'ll Find Here\n\n### 🚀 Projects\nExplore my latest projects showcasing modern web technologies including React, NestJS, and more.\n\n### 📝 Blog\nRead my articles about web development, best practices, and tutorials to help you grow as a developer.\n\n### 💼 About Me\nLearn more about my skills, experience, and what drives me as a developer.\n\n## Tech Stack I Love\n\n- **Frontend**: React, Astro, TailwindCSS\n- **Backend**: NestJS, Node.js\n- **Database**: PostgreSQL, Redis\n- **Tools**: Docker, Git, VS Code\n\nFeel free to explore and reach out if you have any questions!',
      featuredImage: null,
      status: 'published',
      categoryId: webDevCategory?.id,
      tags: ['portfolio', 'introduction', 'web-development'],
      readingTime: 2,
      metaTitle: 'Welcome to My Portfolio - Petrus Handika',
      metaDescription: 'Welcome to my personal portfolio. Explore projects, read articles, and learn about my journey as a Full-Stack Developer.',
      robots: 'index,follow',
      authorId: adminUser.id,
      publishedAt: new Date(),
    });

  await db
    .insert(schema.articles)
    .values({
      slug: 'getting-started-with-nestjs',
      title: 'Getting Started with NestJS: A Complete Guide',
      excerpt: 'Learn how to build scalable and maintainable backend applications with NestJS, the progressive Node.js framework.',
      content: '# Getting Started with NestJS\n\nNestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.\n\n## Prerequisites\n\n- Node.js 18+\n- npm or yarn\n- Basic TypeScript knowledge\n\n## Installation\n\n```bash\nnpm install -g @nestjs/cli\nnest new my-project\n```\n\n## Project Structure\n\nNestJS follows a modular architecture:\n\n```\nsrc/\n├── app.module.ts\n├── app.controller.ts\n├── app.service.ts\n└── main.ts\n```\n\n## Key Concepts\n\n### Modules\nModules are the basic building blocks. Every application has at least one module.\n\n### Controllers\nControllers handle incoming requests and return responses.\n\n### Services\nServices contain the business logic and can be injected into controllers.\n\n## Summary\n\nNestJS provides a great foundation for building enterprise-grade applications with TypeScript.',
      featuredImage: null,
      status: 'published',
      categoryId: tutorialCategory?.id,
      tags: ['nestjs', 'nodejs', 'typescript', 'backend', 'tutorial'],
      readingTime: 5,
      metaTitle: 'Getting Started with NestJS - Complete Guide',
      metaDescription: 'A comprehensive guide to getting started with NestJS. Learn modules, controllers, services, and best practices.',
      robots: 'index,follow',
      authorId: adminUser.id,
      publishedAt: new Date(Date.now() - 86400000), // 1 day ago
    });

  // eslint-disable-next-line no-console
  console.log('✅ Created sample articles');

  // eslint-disable-next-line no-console
  console.log('\n🎉 Seeding completed!');
  // eslint-disable-next-line no-console
  console.log(`\n📝 Login with email: ${adminEmail}`);
}

seed()
  .catch((e: unknown) => {
    // eslint-disable-next-line no-console
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });