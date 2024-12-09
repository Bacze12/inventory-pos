import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto, UpdateUserDto } from './dto/user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  @ApiResponse({ status: 200, type: [UserDto] })
  public async findAll(@Query('isActive') isActive?: string) {
    const filter = isActive !== undefined ? isActive === 'true' : undefined;
    return this.usersService.findAll(filter);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: UserDto })
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserDto })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/deactivate')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Deactivate user' })
  @ApiResponse({ status: 200, type: UserDto })
  public async deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deactivate(id);
  }

  @Patch(':id/reactivate')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Reactivate user' })
  @ApiResponse({ status: 200, type: UserDto })
  public async reactivate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.reactivate(id);
  }
}