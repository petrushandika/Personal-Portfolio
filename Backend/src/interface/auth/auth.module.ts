import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserRepository } from '../../infrastructure/repositories';
import { PasswordService, AuthService, provideJwtService } from '../../infrastructure/auth';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import {
  TUserRepository,
  TPasswordService,
  TAuthService,
} from '../../domain/tokens';
import {
  RegisterUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  LogoutUseCase,
  GetProfileUseCase,
} from '../../application/use-cases';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
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
