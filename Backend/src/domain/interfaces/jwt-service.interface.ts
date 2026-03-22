export interface IJwtService {
  generateAccessToken(payload: { sub: string; email: string; role: string }): Promise<string>;
  generateRefreshToken(): string;
  hashToken(token: string): Promise<string>;
}