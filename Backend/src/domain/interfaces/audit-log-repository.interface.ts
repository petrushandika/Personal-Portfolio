import type { AuditLog } from '../entities/audit-log.entity';

export interface IAuditLogRepository {
  log(data: {
    userId?: string;
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<AuditLog>;
  findAll(params: {
    page?: number;
    limit?: number;
    userId?: string;
    entityType?: string;
    action?: string;
  }): Promise<{ data: AuditLog[]; total: number }>;
}
