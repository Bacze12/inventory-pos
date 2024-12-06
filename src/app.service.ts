import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns a greeting message.
   *
   * @returns {string} A greeting message.
   */
  public getHello(): string {
    return 'Hello World!';
  }
}
