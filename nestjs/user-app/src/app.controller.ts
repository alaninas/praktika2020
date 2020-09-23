import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  myServise: AppService;

  constructor(private readonly appService: AppService) {
    this.myServise = new AppService();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
