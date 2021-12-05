// config.ts
import { IsString, IsPort } from 'class-validator';

export class RootConfig {
  @IsString()
  public readonly NODE_ENV: 'development' | 'staging' | 'production' = 'development';

  @IsPort()
  public readonly PORT: number = 3000;

  @IsString()
  public readonly TYPEORM_CONNECTION: 'postgres';

  @IsString()
  public readonly TYPEORM_HOST: string;

  @IsPort()
  public readonly TYPEORM_PORT: number = 5432;

  @IsString()
  public readonly TYPEORM_USERNAME: string;

  @IsString()
  public readonly TYPEORM_PASSWORD: string;

  @IsString()
  public readonly TYPEORM_DATABASE: string;

  @IsString()
  public readonly TYPEORM_MIGRATIONS_DIR: string;

  @IsString()
  public readonly TYPEORM_MIGRATIONS: string;
}