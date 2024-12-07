import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates a user by email and password.
   *
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns The user object without the password if validation is successful, otherwise null.
   */
  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Logs in a user and returns a JWT access token.
   *
   * @param user - The user object.
   * @returns An object containing the access token.
   */
  public async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Retrieves the roles of a user by user ID.
   *
   * @param userId - The ID of the user.
   * @returns The role of the user.
   */
  public async getUserRoles(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    return user.role;
  }

  public async registerUser(createAuthDto: CreateAuthDto) {
    const { email, password, role, name } = createAuthDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role as UserRole, 
        name,
      },
    });
  }
}
