import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async store(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async index(@Query() params: { page?: string, perpage?: string, query?: string }) {
    return await this.usersService.listUsers(Number(params.page) || 1, Number(params.perpage) || 10, params.query);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.usersService.findUser(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async banUser(@Param('id') id: string, @Query('reason') reason: string) {
    return await this.usersService.deactivateById(id, reason);
  }
}
