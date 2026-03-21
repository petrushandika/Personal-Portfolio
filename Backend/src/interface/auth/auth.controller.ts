import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { LoginDto, RegisterDto, RefreshDto } from '../../application/dto';
import {
  RegisterUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  LogoutUseCase,
  GetProfileUseCase,
} from '../../application/use-cases';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
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
