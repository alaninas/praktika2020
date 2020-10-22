import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, unknown> {
    return {data: `User App running on port ${process.env.APPLICATION_PORT}`};
  }
}
