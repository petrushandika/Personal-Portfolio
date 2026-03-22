import { type ExecutionContext, Injectable } from '@nestjs/common';
import { jwtVerify } from 'jose';

@Injectable()
export class JwtAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers?.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.substring(7);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required for authentication');
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(jwtSecret)
      );

      request.user = {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      return true;
    } catch {
      return false;
    }
  }
}
