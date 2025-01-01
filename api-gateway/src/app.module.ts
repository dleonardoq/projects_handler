import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { envs } from './common/envs';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './common/constants';
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: envs.redisHost,
      port: envs.redisHost,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    ProjectsModule,
    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
