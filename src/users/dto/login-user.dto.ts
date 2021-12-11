import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  public cpf: string;

  @IsString()
  public password: string;
}
