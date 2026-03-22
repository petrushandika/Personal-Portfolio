import type { InferSelectModel } from 'drizzle-orm';
import { articles, auditLogs, projects, refreshTokens, users } from './schema/index.js';

export type UserModel = InferSelectModel<typeof users>;
export type ArticleModel = InferSelectModel<typeof articles>;
export type ProjectModel = InferSelectModel<typeof projects>;
export type RefreshTokenModel = InferSelectModel<typeof refreshTokens>;
export type AuditLogModel = InferSelectModel<typeof auditLogs>;
