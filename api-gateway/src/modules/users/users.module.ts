import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_SERVICE } from './services/user.service';
import { envs } from 'src/common/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.usersMicroserviceHost,
          port: envs.usersMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
