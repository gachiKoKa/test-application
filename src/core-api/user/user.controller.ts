import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, User } from '@shared';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
