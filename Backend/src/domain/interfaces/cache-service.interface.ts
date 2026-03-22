export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: unknown, ttl?: string): Promise<void>;
  del(key: string): Promise<void>;
  delPattern(pattern: string): Promise<void>;
}