import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dotenvLoader, TypedConfigModule } from 'nest-typed-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootConfig } from './env';
import { UsersModule } from './users/users.module';
// import { CaslModule } from './casl/casl.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: (config: RootConfig) => ({
      type: config.TYPEORM_CONNECTION,
      host: config.TYPEORM_HOST,
      port: config.TYPEORM_PORT,
      username: config.TYPEORM_USERNAME,
      password: config.TYPEORM_PASSWORD,
      database: config.TYPEORM_DATABASE,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ]
    }),
    inject: [RootConfig]
  }), UsersModule, TypedConfigModule.forRoot({
    schema: RootConfig,
    load: dotenvLoader()
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
