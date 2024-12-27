import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASK_MICROSERVICE_KEY } from './services/tasks.services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASK_MICROSERVICE_KEY) private readonly tasksCliente: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksCliente.send({ cmd: 'createTask' }, createTaskDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll() {
    console.log('api-gateway controler findall');
    return this.tasksCliente.send({ cmd: 'findAllTasks' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.tasksCliente.send({ cmd: 'findOneTask' }, { code }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateTaskDto: UpdateTaskDto) {
    const data = {
      ...updateTaskDto,
      code,
    };
    return this.tasksCliente.send({ cmd: 'updateTask' }, data).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.tasksCliente.send({ cmd: 'removeTask' }, { code }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
