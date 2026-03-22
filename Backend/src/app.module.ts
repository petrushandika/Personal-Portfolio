import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from './infrastructure/cache/cache.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ArticleModule } from './interface/article/article.module';
import { AuthModule } from './interface/auth/auth.module';
import { CategoryModule } from './interface/category/category.module';
import { HealthModule } from './interface/health/health.module';
import { ProjectModule } from './interface/project/project.module';
import { UploadModule } from './interface/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    DatabaseModule,
    CacheModule,
    AuthModule,
    HealthModule,
    ArticleModule,
    ProjectModule,
    CategoryModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
