import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `User App running on port ${process.env.APPLICATION_PORT}`;
  }
}
