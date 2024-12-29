import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { envs } from './common/envs';
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: envs.redisHost,
      port: envs.redisHost,
    }),
    ProjectsModule,
    TasksModule,
  ],
})
export class AppModule {}
