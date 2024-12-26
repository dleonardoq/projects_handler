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
import { ClientProxy } from '@nestjs/microservices';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASK_MICROSERVICE_KEY) private readonly tasksCliente: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksCliente.send({ cmd: 'createTask' }, createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksCliente.send({ cmd: 'findAllTasks' }, {});
  }

  @Get(':id')
  findOne(@Param('code') code: string) {
    return this.tasksCliente.send({ cmd: 'findOneTask' }, { code });
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateTaskDto: UpdateTaskDto) {
    const data = {
      ...updateTaskDto,
      code,
    };
    return this.tasksCliente.send({ cmd: 'updateTask' }, data);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.tasksCliente.send({ cmd: 'removeTask' }, { code });
  }
}
