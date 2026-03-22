import { Module, Logger, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import type { ICacheService } from '../../domain/interfaces/cache-service.interface';
import { TCacheService } from '../../domain/tokens';

class NullCacheService implements ICacheService {
  async get<T>(): Promise<T | null> { return null; }
  async set(): Promise<void> { return; }
  async del(): Promise<void> { return; }
  async delPattern(): Promise<void> { return; }
}

export class CacheService implements ICacheService {
  private redis: Redis;
  private isConnected = false;
  private logger = new Logger('CacheService');
  private authFailed = false;

  constructor(redisUrl: string, redisPassword?: string) {
    this.redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      password: redisPassword ?? undefined,
      retryStrategy: (times: number) => {
        if (this.authFailed) return null; // Stop retrying on auth failure
        if (times > 5) return null; // Max 5 retries
        return Math.min(times * 200, 2000);
      },
      lazyConnect: false,
      enableReadyCheck: true,
    });

    this.redis.on('connect', () => {
      if (!this.authFailed) {
        this.isConnected = true;
        this.logger.log('Redis connected');
      }
    });

    this.redis.on('error', (err: Error) => {
      this.isConnected = false;
      if (err.message.includes('NOAUTH') || err.message.includes('Authentication') || err.message.includes('ERR AUTH')) {
        if (!this.authFailed) {
          this.authFailed = true;
          this.logger.warn('Redis authentication failed — falling back to no-op cache');
          this.redis.disconnect(false);
        }
      } else if (!this.authFailed) {
        this.logger.warn(`Redis error: ${err.message}`);
      }
    });

    this.redis.on('ready', () => {
      if (!this.authFailed) {
        this.isConnected = true;
      }
    });

    this.redis.on('close', () => {
      this.isConnected = false;
    });
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) return null;
    try {
      const value = await this.redis.get(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  async set(key: string, value: unknown, ttl?: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await this.redis.setex(key, this.parseTtl(ttl), serialized);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch {
      // Silently fail — cache is optional
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.redis.del(key);
    } catch {
      // Silently fail
    }
  }

  async delPattern(pattern: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch {
      // Silently fail
    }
  }

  private parseTtl(ttl: string): number {
    const regex = /^(\d+)([smhd])$/;
    const match = regex.exec(ttl);
    if (!match?.[1]) return 300;

    const value = Number.parseInt(match[1], 10);
    const unit = match[2] ?? '';

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      default: return 300;
    }
  }
}

@Global()
@Module({
  providers: [
    {
      provide: TCacheService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        if (redisUrl) {
          const redisPassword = configService.get<string>('REDIS_PASSWORD');
          const logger = new Logger('CacheModule');
          logger.log('Redis URL configured, attempting connection...');
          return new CacheService(redisUrl, redisPassword);
        }
        const logger = new Logger('CacheModule');
        logger.log('No REDIS_URL configured — using NullCacheService (no-op cache)');
        return new NullCacheService();
      },
    },
  ],
  exports: [TCacheService],
})
export class CacheModule {}