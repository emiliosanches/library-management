import { IsString, Length } from 'class-validator';

export class BanUserDto {
  @IsString()
  @Length(8, 128)
  public reason: string;
}
