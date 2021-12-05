import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public full_name: string;
  
  @IsString()
  @Length(11, 11)
  public cpf: string;
  
  @IsString()
  public role: 'USER' | 'EMPLOYEE' | 'ADMIN';
  
  @IsString()
  public password: string;
}
