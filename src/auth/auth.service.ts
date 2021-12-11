import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }
  
  private async validateUser(cpf: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByDocument(cpf);

    if (user.password === password) return user

    return null
  }

  async login({ cpf, password }: { cpf: string, password: string }) {
    const user = await this.validateUser(cpf, password)

    if (!user) return new BadRequestException('Invalid credentials')

    delete user.password;

    return {
      user: user,
      access_token: this.jwtService.sign(user)
    };
  }
}
