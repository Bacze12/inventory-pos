import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a greeting message.
   * 
   * @returns {string} A greeting message.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
