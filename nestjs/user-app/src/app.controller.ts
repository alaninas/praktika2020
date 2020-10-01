import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  myServise: AppService;

  constructor(private readonly appService: AppService, private readonly authService: AuthService) {
    this.myServise = new AppService();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user._doc);
  }

  // Check how the passport package works: curl to the auth/login via POST
  // Get in return user._doc object with user information, stored in DB
  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
    // return req.user._doc;
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}