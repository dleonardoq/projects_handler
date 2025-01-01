import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './common/envs';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${envs.mongoUser}:${envs.mongoPassword}@${envs.mongoHost}:${envs.mongoPort}/${envs.mongoDb}`,
    ),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
