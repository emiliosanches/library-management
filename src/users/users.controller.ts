import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { CaslGuard } from 'src/guards/casl/casl.guard';
import { CheckAbilities } from 'src/guards/casl/casl.decorator';
import { Action } from 'src/casl/actions';
import { User } from './entities/user.entity';
import { subject } from '@casl/ability';
import { canById } from 'src/casl/helpers';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(OptionalJwtAuthGuard, CaslGuard)
  @CheckAbilities((ability, req) => ability.can(Action.Create, subject('User', req.body)))
  @Post()
  async store(@Body() data: CreateUserDto) {
    return await this.usersService.create(data);
  }

  @Get()
  async index(@Query() params: { page?: string, perpage?: string, query?: string }) {
    return await this.usersService.listUsers(Number(params.page) || 1, Number(params.perpage) || 10, params.query);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.usersService.findUser(id);
  }

  @UseGuards(JwtAuthGuard, CaslGuard)
  @CheckAbilities((ability, req) => canById(ability, Action.Update, User, req.params.id))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.usersService.updateById(id, data);
  }

  @UseGuards(JwtAuthGuard, CaslGuard)
  @CheckAbilities(async (ability, req) => canById(ability, Action.Ban, User, req.params.id))
  @Patch(':id/ban')
  async banUser(@Param('id') id: string, @Body() { reason }: BanUserDto) {
    return await this.usersService.deactivateById(id, reason);
  }

  @UseGuards(JwtAuthGuard, CaslGuard)
  @CheckAbilities(async (ability, req) => canById(ability, Action.Unban, User, req.params.id))
  @Patch(':id/unban')
  async unbanUser(@Param('id') id: string) {
    return await this.usersService.reactivateById(id);
  }
}
