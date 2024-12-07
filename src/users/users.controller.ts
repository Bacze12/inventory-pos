import { Controller, Get, Param, ParseIntPipe, Patch, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto, UpdateUserDto } from './dto/user.dto';
import {IsValidRole} from 'src/common/decorators/roles.decorator'


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all users, optionally filtered by state' })
  @ApiResponse({ status: 200, description: 'The list of users', type: [UserDto] })
  async findAll(@Query('isActive') isActive?: string) {
    const filter = isActive !== undefined ? isActive === 'true' : undefined;
    return this.usersService.findAll(filter);
  }


  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'The found record', type: UserDto })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'The updated record', type: UserDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto,) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a user by ID' })
  @ApiResponse({ status: 200, description: 'The user was deactivated' })
  async deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deactivate(id);
  }


  @Patch(':id/reactivate')
  @ApiOperation({ summary: 'Reactivate a user by ID' })
  @ApiResponse({ status: 200, description: 'The user was reactivated' })
  async reactivate(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.reactivate(id);
    }


}
