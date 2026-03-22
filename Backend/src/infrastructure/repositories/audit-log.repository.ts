import { Inject } from '@nestjs/common';
import type { IAuditLogRepository } from '../../domain/interfaces/audit-log-repository.interface';
import type { AuditLog } from '../../domain/entities/audit-log.entity';
import { desc, eq, sql, and } from 'drizzle-orm';
import { auditLogs } from '../../database/schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../database/schema';

export class AuditLogRepository implements IAuditLogRepository {
  constructor(
    @Inject('DB') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async log(data: {
    userId?: string;
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<AuditLog> {
    const [log] = await this.db.insert(auditLogs).values(data).returning();
    return log as AuditLog;
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    userId?: string;
    entityType?: string;
    action?: string;
  }): Promise<{ data: AuditLog[]; total: number }> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (params.userId) conditions.push(eq(auditLogs.userId, params.userId));
    if (params.entityType) conditions.push(eq(auditLogs.entityType, params.entityType));
    if (params.action) conditions.push(eq(auditLogs.action, params.action));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
      this.db
        .select()
        .from(auditLogs)
        .where(whereClause)
        .orderBy(desc(auditLogs.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ count: sql<number>`count(*)` }).from(auditLogs).where(whereClause),
    ]);

    return { data: data as AuditLog[], total: Number(countResult[0]?.count) || 0 };
  }
}
