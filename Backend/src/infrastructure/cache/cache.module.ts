import { Module, Logger, Global } from '@nestjs/common';
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

  constructor(redisUrl: string, redisPassword?: string) {
    this.redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      password: redisPassword ?? undefined,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.redis.on('connect', () => {
      this.isConnected = true;
      this.logger.log('Redis connected');
    });
    this.redis.on('error', (err) => {
      this.isConnected = false;
      if (err.message.includes('NOAUTH') || err.message.includes('Authentication')) {
        this.logger.warn('Redis authentication failed, using null cache');
      } else {
        this.logger.warn('Redis connection error:', err.message);
      }
    });
    this.redis.on('ready', () => {
      this.isConnected = true;
    });
    this.redis.on('close', () => {
      this.isConnected = false;
    });
  }

  async onModuleInit() {
    // ioredis auto-connects, no need to call connect()
    // Just wait a bit to see if connection succeeds
    await new Promise((resolve) => setTimeout(resolve, 100));
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
        await this.redis.setex(key, this.parseTtl(ttl) ?? 300, serialized);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch {
      // Silently fail
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
      useClass: NullCacheService,
    },
  ],
  exports: [TCacheService],
})
export class CacheModule {}