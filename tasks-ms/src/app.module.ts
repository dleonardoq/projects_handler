import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './common/envs';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${envs.mongoUser}:${envs.mongoPassword}@${envs.mongoHost}:27017/${envs.mongoDb}`,
    ),
    TasksModule,
  ],
})
export class AppModule {}
