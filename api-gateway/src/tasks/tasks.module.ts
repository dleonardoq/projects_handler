import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TASK_MICROSERVICE_KEY } from './services/tasks.services';
import { envs } from 'src/common/envs';

@Module({
  controllers: [TasksController],
  imports: [
    ClientsModule.register([
      {
        name: TASK_MICROSERVICE_KEY,
        transport: Transport.TCP,
        options: {
          port: envs.tasksMicroservicePort,
          host: envs.tasksMicroserviceHost,
        },
      },
    ]),
  ],
})
export class TasksModule {}
