import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { PasswordService } from '../../infrastructure/auth/password.service';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { provideJwtService } from '../../infrastructure/auth/jwt.service';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { TUserRepository, TPasswordService, TAuthService } from '../../domain/tokens';
import {
  RegisterUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  LogoutUseCase,
  GetProfileUseCase,
} from '../../application/use-cases/auth.use-case';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) throw new Error('JWT_SECRET environment variable is required');
        return {
          secret,
          signOptions: { expiresIn: '15m' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    { provide: TUserRepository, useClass: UserRepository },
    { provide: TPasswordService, useClass: PasswordService },
    provideJwtService,
    { provide: TAuthService, useClass: AuthService },
    JwtAuthGuard,
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    GetProfileUseCase,
  ],
  exports: [TAuthService, JwtAuthGuard],
})
export class AuthModule {}