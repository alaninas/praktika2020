import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  myServise: AppService;

  constructor(private readonly appService: AppService, private readonly authService: AuthService) {
    this.myServise = new AppService();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user._doc;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}