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

  // Create projects
  const projectsData = [
    {
      slug: 'danaku',
      title: 'Danaku',
      description: 'A modern personal finance app inspired by the film Home Sweet Loan, designed to help users achieve homeownership goals. Built with a high-performance stack featuring real-time transaction tracking and loan management setups layouts designs setups configurations.',
      content: 'Danaku is a modern personal finance app inspired by the film Home Sweet Loan, designed to help users achieve homeownership goals. Built with a high-performance 2026 tech stack featuring Next.js 16, React 19, NestJS 11, and PostgreSQL 17, it leverages Turbopack and Biome for maximum efficiency. Key features include real-time transaction tracking, loan management, and interactive data visualization via Shadcn Charts for strategic financial navigation setups triggers.',
      techStack: ['Next.js', 'React', 'NestJS', 'PostgreSQL', 'TailwindCSS', 'Shadcn UI'],
      techStackIcons: [
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'React', icon: 'reactjs' },
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'TailwindCSS', icon: 'tailwindcss' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: 'https://danaku.site/',
      featured: true,
      order: 1,
    },
    {
      slug: 'reluv-app',
      title: 'Reluv App',
      description: 'A preloved fashion e-commerce platform built with Next.js 16, React 19, and TypeScript for a modern UI. Integrated with Cloudinary, Midtrans setups framing design setups configs setups setups triggers configurations setups layouts configs setups triggers framing setups configurations triggers framing setups.',
      content: 'Reluv App is a preloved fashion e-commerce platform built with Next.js 16, React 19, and TypeScript for a modern UI. NestJS 11 and PostgreSQL with Prisma ORM manage the backend, while Zustand handles state management and JWT ensures secure authentication. Integrated with Cloudinary, Midtrans, and Biteship, it delivers seamless image uploads, payments, and shipping for a complete buying and selling experience setups layout.',
      techStack: ['Next.js', 'React', 'NestJS', 'PostgreSQL', 'Prisma', 'Cloudinary', 'Zustand'],
      techStackIcons: [
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'React', icon: 'reactjs' },
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: 'https://fe-reluv-app.vercel.app/',
      featured: true,
      order: 2,
    },
    {
      slug: 'one-log-ulam',
      title: 'One Log (ULAM)',
      description: 'A centralized observability platform built with Go, React 19, and PostgreSQL that aggregates logs from multiple applications in real-time. Featuring AI setups configs setups setups triggers configurations setups layouts configs setups triggers framing setups configurations triggers.',
      content: 'One Log (ULAM) is a centralized observability platform built with Go, React 19, and PostgreSQL that aggregates logs from multiple applications in real-time. Featuring AI-powered root cause analysis, automatic error grouping with SHA-256 fingerprinting, and comprehensive performance monitoring (P50/P95/P99 latency tracking), it eliminates the need for server SSH by providing a unified dashboard setups configs.',
      techStack: ['Go', 'React', 'PostgreSQL', 'AI', 'Clean Architecture'],
      techStackIcons: [
        { name: 'Go', icon: 'go' },
        { name: 'React', icon: 'reactjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: '',
      featured: true,
      order: 3,
    },
    {
      slug: 'lakoe-app',
      title: 'Lakoe App',
      description: 'An advanced online shopping platform built with React and NestJS for dynamic scalable experience setups layout setups layout shapes frame set configs setups layoutsconfigs setups layout configs setups.',
      content: 'Lakoe E-Commerce is an advanced online shopping platform built with React for a dynamic user interface. It leverages TailwindCSS and Shadcn UI for a modern, responsive design. TypeScript ensures type safety and reliability, while Zustand provides state management. The backend is powered by NestJS, utilizing Prisma ORM with PostgreSQL for efficient data handling setups framing configs setups setups configs triggers.',
      techStack: ['React', 'NestJS', 'Prisma', 'PostgreSQL', 'TailwindCSS', 'Zustand'],
      techStackIcons: [
        { name: 'React', icon: 'reactjs' },
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'TailwindCSS', icon: 'tailwindcss' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: '',
      featured: false,
      order: 4,
    },
    {
      slug: 'cinemate',
      title: 'Cinemate',
      description: 'Cinemate is a web platform for movie enthusiasts, built with React, TMDB API and CI/CD setups setups shapes setups configs setups configuration setups layout setups.',
      content: 'Cinemate is a web platform for movie enthusiasts, built with React, TMDB API and CI/CD. Users can search for the latest and popular films, and view real-time details and ratings. Its responsive search and user-friendly interface make exploring the world of cinema easy and enjoyable setups layout.',
      techStack: ['React', 'TMDB API', 'CI/CD'],
      techStackIcons: [
        { name: 'React', icon: 'reactjs' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: '',
      featured: false,
      order: 5,
    },
    {
      slug: 'circle-app',
      title: 'Circle App',
      description: 'Social media platform built with React and TypeScript for interactive secure setups setups configurations triggers setups layouts.',
      content: 'Circle App is a social media platform built with React and TypeScript for an interactive and secure user interface. Chakra UI ensures a responsive design, while Express and Node.js manage the backend with Prisma and PostgreSQL for efficient data handling. Redux is used for state management and JWT triggers setups.',
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Chakra UI'],
      techStackIcons: [
        { name: 'React', icon: 'reactjs' },
        { name: 'Node.js', icon: 'nodejs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: '',
      featured: false,
      order: 6,
    },
    {
      slug: 'delta-dekoria',
      title: 'Delta Dekoria',
      description: 'Furniture modern brand website utilizing Wordpress design setups setups configurations layout framing.',
      content: 'Delta Dekoria Furniture is a modern furniture brand that utilizes Figma for designing engaging and user-friendly interfaces. The website is powered by WordPress, allowing for flexible content management and seamless updates. This combination ensures a visually appealing and functional online presence setups structures layout setups configurations.',
      techStack: ['WordPress', 'Figma'],
      techStackIcons: [
        { name: 'WordPress', icon: 'wordpress' },
        { name: 'Figma', icon: 'figma' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: '',
      featured: false,
      order: 7,
    },
    {
      slug: 'the-aesthetics-skin',
      title: 'The Aesthetics Skin',
      description: 'Landing page for aesthetic clinic built with React and NestJS framing configurations design setups configs setups configurations triggers.',
      content: 'The Aesthetics Skin is a modern e-commerce landing page for an aesthetic clinic, built with React, TailwindCSS, and Shadcn UI to deliver an elegant and responsive user interface. The backend is powered by NestJS with Prisma ORM and PostgreSQL, ensuring fast and reliable data management setups configurations.',
      techStack: ['React', 'NestJS', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
      techStackIcons: [
        { name: 'React', icon: 'reactjs' },
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: '',
      featured: false,
      order: 8,
    },
    {
      slug: 'trivia-game-app',
      title: 'Trivia Game App',
      description: 'Mobile application built with React Native for cross-platform layouts framing configurations setups setups configs structures layouts triggers setups layout setups setups configurations layout shapes trigger setups.',
      content: 'Trivia Game App is an engaging mobile application built with React Native for a cross-platform experience. It uses TailwindCSS and NativeBase for a sleek and responsive design. The backend is powered by NestJS with Prisma ORM and PostgreSQL for efficient data management setups configs layout.',
      techStack: ['React Native', 'NestJS', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
      techStackIcons: [
        { name: 'React', icon: 'reactjs' },
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'PostgreSQL', icon: 'postgresql' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: '',
      featured: false,
      order: 9,
    },
    {
      slug: 'velocia',
      title: 'Velocia',
      description: 'Car marketplace app built with React Drizzle setups layout setups setups configs designs layouts configurations configs triggers.',
      content: 'Velocia is a car marketplace app built with React for a dynamic and interactive user interface. It uses TailwindCSS for a modern, responsive design and Drizzle ORM for efficient data management. Clerk handles authentication and user management, ensuring a secure and seamless experience setups configs setups layout config setups layout shapes.',
      techStack: ['React', 'Drizzle ORM', 'Clerk', 'TailwindCSS'],
      techStackIcons: [
        { name: 'React', icon: 'reactjs' },
        { name: 'TailwindCSS', icon: 'tailwindcss' },
      ],
      githubUrl: 'https://github.com/petrushandika',
      liveUrl: '',
      featured: false,
      order: 10,
    },
  ];

  for (const project of projectsData) {
    await db
      .insert(schema.projects)
      .values({
        ...project,
        images: [],
        thumbnail: null,
        metaTitle: `${project.title} - Petrus Handika`,
        metaDescription: project.description.substring(0, 150),
      });
  }

  // eslint-disable-next-line no-console
  console.log('✅ Created projects');

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