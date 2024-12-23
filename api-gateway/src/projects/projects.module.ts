import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROJECT_MICROSERVICE_KEY } from './services/projects.services';
import { envs } from 'src/common/envs';

@Module({
  controllers: [ProjectsController],
  imports: [
    ClientsModule.register([
      {
        name: PROJECT_MICROSERVICE_KEY,
        transport: Transport.TCP,
        options: {
          port: envs.projectsMicroservicePort,
          host: envs.projectsMicroserviceHost,
        },
      },
    ]),
  ],
})
export class ProjectsModule {}
