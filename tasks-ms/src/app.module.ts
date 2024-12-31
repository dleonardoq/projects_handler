import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './common/envs';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${envs.mongoUser}:${envs.mongoPassword}@${envs.mongoHost}:${envs.mongoPort}/${envs.mongoDb}`,
    ),
    TasksModule,
  ],
})
export class AppModule {}
