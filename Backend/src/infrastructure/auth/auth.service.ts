import { Inject, UnauthorizedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { IAuthService } from '../../domain/interfaces/auth-service.interface';
import type { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { User } from '../../domain/entities/user.entity';
import { refreshTokens } from '../../database/schema';
import { TJwtService, TUserRepository } from '../../domain/tokens';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from '../../database/schema';

export class AuthService implements IAuthService {
  constructor(
    @Inject('DB') private readonly db: NodePgDatabase<typeof schema>,
    @Inject(TJwtService) private readonly jwtService: IJwtService,
    @Inject(TUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const { hash } = await import('argon2');
    const passwordHash = await hash(password);

    return this.userRepository.create({
      email,
      passwordHash,
      role: 'admin',
    });
  }

  async login(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { verify } = await import('argon2');
    const isValid = await verify(user.passwordHash, password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = this.jwtService.generateRefreshToken();
    await this.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const tokenHash = await this.jwtService.hashToken(refreshToken);

    const storedToken = await this.db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.tokenHash, tokenHash),
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepository.findById(storedToken.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Token rotation: delete old, create new
    await this.db.delete(refreshTokens).where(eq(refreshTokens.id, storedToken.id));

    const newAccessToken = await this.jwtService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = this.jwtService.generateRefreshToken();
    await this.saveRefreshToken(user.id, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenHash = await this.jwtService.hashToken(refreshToken);
    await this.db.delete(refreshTokens).where(eq(refreshTokens.tokenHash, tokenHash));
  }

  async getProfile(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const tokenHash = await this.jwtService.hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.db.insert(refreshTokens).values({
      userId,
      tokenHash,
      expiresAt,
    });
  }
}
