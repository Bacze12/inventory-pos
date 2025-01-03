import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserRole } from '@prisma/client';

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

@Injectable()
export class AuthService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !user.isActive) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: Omit<User, 'password'>) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  public async getUserRoles(userId: string): Promise<UserRole> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user.role;
  }

  public async registerUser(createAuthDto: CreateAuthDto) {
    const { email, password, role, name } = createAuthDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
          name,
          isActive: true,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          isActive: true,
        },
      });

      return user;
    } catch {
      throw new Error('Could not register user');
    }
  }
}
