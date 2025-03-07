import { Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    return this.authService.signup(body.email, body.password);
  }

  //   @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string; newPassword: string }) {
    return this.authService.forgotPassword(body.email, body.newPassword);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req) {
    return { message: 'Logged out successfully' };
  }
}
