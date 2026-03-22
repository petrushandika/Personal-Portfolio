import 'reflect-metadata';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? 'postgresql://postgres:123456@localhost:5432/portfolio',
});

const db = drizzle(pool, { schema });

async function seed() {
  console.log('🌱 Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL ?? 'petrushandikasinaga@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'LumonoW4';

  const hashedPassword = await import('argon2').then((argon2) => argon2.hash(adminPassword));
  
  const [adminUser] = await db
    .insert(schema.users)
    .values({
      email: adminEmail,
      passwordHash: hashedPassword,
      role: 'admin',
    })
    .returning();

  if (!adminUser) {
    throw new Error('Failed to create admin user');
  }

  console.log('✅ Created admin user:', adminUser.email);

  await db
    .insert(schema.projects)
    .values({
      slug: 'personal-portfolio',
      title: 'Personal Portfolio',
      description: 'A modern personal portfolio website built with Astro, React, and NestJS',
      content: 'This is my personal portfolio website showcasing my projects and blog posts.',
      techStack: ['Astro', 'React', 'NestJS', 'PostgreSQL', 'Redis', 'TailwindCSS'],
      githubUrl: 'https://github.com/yourusername/portfolio',
      liveUrl: 'https://yourportfolio.com',
      images: [],
      featured: true,
      order: 1,
    });

  console.log('✅ Created sample project');

  await db
    .insert(schema.articles)
    .values({
      slug: 'welcome-to-my-portfolio',
      title: 'Welcome to My Portfolio',
      excerpt: 'Welcome to my personal portfolio website. Here you can find information about me and my projects.',
      content: '# Welcome\n\nThis is my personal portfolio website. I built this using modern technologies including Astro, React, NestJS, PostgreSQL, and Redis.\n\n## Features\n\n- Clean Architecture\n- JWT Authentication\n- Redis Caching\n- PostgreSQL Database\n- Beautiful UI with TailwindCSS',
      featuredImage: null,
      status: 'published',
      metaTitle: 'Welcome to My Portfolio',
      metaDescription: 'Personal portfolio website built with modern technologies',
      authorId: adminUser.id,
      publishedAt: new Date(),
    });

  console.log('✅ Created sample article');

  console.log('\n🎉 Seeding completed!');
  console.log('\n📝 Login credentials:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
}

seed()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });