import { Injectable } from '@nestjs/common';
import { VERSION } from './app.module';

@Injectable()
export class AppService {
  getHello(): string {
    return VERSION;
  }
}
