import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateAuthDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
    async login(@Body() loginUserDto: CreateAuthDto) {
        const user = await this.authService.validateUser(
        loginUserDto.email,
        loginUserDto.password,
        );
    
        if (!user) {
        return { message: 'Invalid email or password' };
        }
    
        return this.authService.login(user);
    }
}
