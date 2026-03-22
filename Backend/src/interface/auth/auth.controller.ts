import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { LoginDto } from '../../application/dto/auth.dto';
import type { RegisterDto } from '../../application/dto/auth.dto';
import type { RefreshDto } from '../../application/dto/auth.dto';
import { RegisterUseCase } from '../../application/use-cases/auth.use-case';
import { LoginUseCase } from '../../application/use-cases/auth.use-case';
import { RefreshTokenUseCase } from '../../application/use-cases/auth.use-case';
import { LogoutUseCase } from '../../application/use-cases/auth.use-case';
import { GetProfileUseCase } from '../../application/use-cases/auth.use-case';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(RegisterUseCase) private readonly registerUseCase: RegisterUseCase,
    @Inject(LoginUseCase) private readonly loginUseCase: LoginUseCase,
    @Inject(RefreshTokenUseCase) private readonly refreshTokenUseCase: RefreshTokenUseCase,
    @Inject(LogoutUseCase) private readonly logoutUseCase: LogoutUseCase,
    @Inject(GetProfileUseCase) private readonly getProfileUseCase: GetProfileUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.registerUseCase.execute(dto);
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const result = await this.loginUseCase.execute(dto);
    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: {
          id: result.user.id,
          email: result.user.email,
          role: result.user.role,
        },
      },
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshDto) {
    const result = await this.refreshTokenUseCase.execute(dto.refreshToken);
    return {
      success: true,
      data: result,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() dto: RefreshDto) {
    await this.logoutUseCase.execute(dto.refreshToken);
    return {
      success: true,
      data: null,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: any) {
    const user = req.user;
    const profile = await this.getProfileUseCase.execute(user.userId);
    return {
      success: true,
      data: profile,
    };
  }
}