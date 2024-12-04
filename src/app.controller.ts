import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  /**
   * This is the root route handler.
   * It returns a simple greeting message.
   * 
   * @returns {string} A greeting message.
   */
  @Get()
  public getHello(): string {
    return 'Hello World!';
  }
}
