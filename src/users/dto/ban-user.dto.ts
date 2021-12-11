import { IsString, Length } from 'class-validator';

export class BanUserDTO {
  @IsString()
  @Length(8, 128)
  public reason: string;
}
