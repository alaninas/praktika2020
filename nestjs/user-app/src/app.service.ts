import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env);
    return `Application running on port ${process.env.APPLICATION_PORT}`;
  }
}
