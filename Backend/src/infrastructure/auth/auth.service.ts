import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { IAuthService, IJwtService, IUserRepository } from '../../domain/interfaces';
import type { User } from '../../domain/entities';
import { refreshTokens } from '../../database/schema';
import { TJwtService, TUserRepository } from '../../domain/tokens';

export class AuthService implements IAuthService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    @Inject('DB') private readonly db: any,
    @Inject(TJwtService) private readonly jwtService: IJwtService,
    @Inject(TUserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const passwordHash = await (await import('argon2')).default.hash(password);

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
      throw new Error('Invalid credentials');
    }

    const isValid = await (await import('argon2')).default.verify(user.passwordHash, password);
    if (!isValid) {
      throw new Error('Invalid credentials');
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
      throw new Error('Invalid refresh token');
    }

    const user = await this.userRepository.findById(storedToken.userId);
    if (!user) {
      throw new Error('User not found');
    }

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
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.db.insert(refreshTokens).values({
      userId,
      tokenHash,
      expiresAt,
    });
  }
}
