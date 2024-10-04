import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/signup')
  async signupLocal(@Body() authDto: AuthDto): Promise<Tokens> {
    return await this.authService.signupLocal(authDto);
  }

  @Post('local/signin')
  async signinLocal(@Body() authDto: AuthDto) {
    return await this.authService.signinLocal(authDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = req.user['id'];
    return await this.authService.logout(user);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refreshTokens(@Req() req: Request) {
    const user = req.user;
    return await this.authService.refreshTokens(
      user['id'],
      user['refreshToken'],
    );
  }
}
