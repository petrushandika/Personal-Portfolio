import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { refreshTokens, users } from '../../database/schema';

@Injectable()
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(
    private readonly db: any,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(email: string, password: string): Promise<any> {
    const existing = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await argon2.hash(password);

    const [user] = await this.db
      .insert(users)
      .values({
        email,
        passwordHash,
        role: 'admin',
      })
      .returning();

    return user;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await argon2.verify(user.passwordHash, password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken();

    const tokenHash = await this.hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.db.insert(refreshTokens).values({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    return { accessToken, refreshToken, user };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const tokenHash = await this.hashToken(refreshToken);

    const storedToken = await this.db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.tokenHash, tokenHash),
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.db.query.users.findFirst({
      where: eq(users.id, storedToken.userId),
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.db.delete(refreshTokens).where(eq(refreshTokens.id, storedToken.id));

    const newAccessToken = await this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken();

    const newTokenHash = await this.hashToken(newRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.db.insert(refreshTokens).values({
      userId: user.id,
      tokenHash: newTokenHash,
      expiresAt,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenHash = await this.hashToken(refreshToken);
    await this.db.delete(refreshTokens).where(eq(refreshTokens.tokenHash, tokenHash));
  }

  async getProfile(userId: string): Promise<any | undefined> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    return user ?? undefined;
  }

  private async generateAccessToken(user: any): Promise<string> {
    return new SignJWT({
      sub: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .setIssuer(this.configService.get<string>('APP_NAME', 'portfolio'))
      .setAudience(this.configService.get<string>('APP_URL', 'http://localhost:4321'))
      .sign(new TextEncoder().encode(this.configService.get<string>('JWT_SECRET')));
  }

  private generateRefreshToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  private async hashToken(token: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}
