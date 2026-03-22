import { Inject, Injectable } from '@nestjs/common';
import type { IAuthService } from '../../domain/interfaces/auth-service.interface';
import type { IPasswordService } from '../../domain/interfaces/password-service.interface';
import type { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import type { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import type { User } from '../../domain/entities/user.entity';
import type { LoginDto } from '../dto/auth.dto';
import type { RegisterDto } from '../dto/auth.dto';
import { TUserRepository, TPasswordService, TJwtService, TAuthService } from '../../domain/tokens';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(TUserRepository) private readonly userRepository: IUserRepository,
    @Inject(TPasswordService) private readonly passwordService: IPasswordService,
  ) {}

  async execute(dto: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const passwordHash = await this.passwordService.hash(dto.password);

    const user = await this.userRepository.create({
      email: dto.email,
      passwordHash,
      role: 'admin',
    });

    return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt };
  }
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(TUserRepository) private readonly userRepository: IUserRepository,
    @Inject(TPasswordService) private readonly passwordService: IPasswordService,
    @Inject(TJwtService) private readonly jwtService: IJwtService,
    @Inject(TAuthService) private readonly authService: IAuthService,
  ) {}

  async execute(dto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Omit<User, 'passwordHash'>;
  }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await this.passwordService.verify(dto.password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = await this.jwtService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = this.jwtService.generateRefreshToken();
    await this.authService.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt },
    };
  }
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(TAuthService) private readonly authService: IAuthService,
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.refresh(refreshToken);
  }
}

@Injectable()
export class LogoutUseCase {
  constructor(@Inject(TAuthService) private readonly authService: IAuthService) {}

  async execute(refreshToken: string): Promise<void> {
    await this.authService.logout(refreshToken);
  }
}

@Injectable()
export class GetProfileUseCase {
  constructor(@Inject(TUserRepository) private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;
    return { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt };
  }
}
