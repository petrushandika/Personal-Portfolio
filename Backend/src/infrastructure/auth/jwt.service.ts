import { SignJWT } from 'jose';
import { ConfigService } from '@nestjs/config';
import type { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import { TJwtService } from '../../domain/tokens';

export class JwtService implements IJwtService {
  constructor(
    private readonly jwtSecret: string,
    private readonly issuer = 'portfolio',
    private readonly audience = 'http://localhost:4321',
  ) {}

  async generateAccessToken(payload: { sub: string; email: string; role: string }): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .setIssuer(this.issuer)
      .setAudience(this.audience)
      .sign(new TextEncoder().encode(this.jwtSecret));
  }

  generateRefreshToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  async hashToken(token: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}

export const provideJwtService = {
  provide: TJwtService,
  useFactory: (configService: ConfigService) => {
    const jwtSecret = configService.get<string>('JWT_SECRET') ?? '';
    return new JwtService(jwtSecret);
  },
  inject: [ConfigService],
};
