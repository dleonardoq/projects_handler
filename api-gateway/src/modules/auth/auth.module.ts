import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/common/envs';
import { AUTH_MICROSERVICE_KEY } from './services/login.services';

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.register([
      {
        name: AUTH_MICROSERVICE_KEY,
        transport: Transport.TCP,
        options: {
          port: envs.usersMicroservicePort,
          host: envs.usersMicroserviceHost,
        },
      },
    ]),
  ],
})
export class AuthModule {}
