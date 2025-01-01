import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  SetMetadata,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASK_MICROSERVICE_KEY } from './services/tasks.services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ProjectValidationGuard } from 'src/common/guards/project-validation.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(ProjectValidationGuard, AuthGuard)
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

  @SetMetadata('excludeProjectvalidationGurad', true)
  @Get()
  findAll() {
    return this.tasksCliente.send({ cmd: 'findAllTasks' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @SetMetadata('excludeProjectvalidationGurad', true)
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
    if ('code' in updateTaskDto) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Code property can not be updated`,
      });
    }
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

  @Delete(':project_code/:code')
  remove(
    @Param('project_code') projectCode: string,
    @Param('code') code: string,
  ) {
    return this.tasksCliente.send({ cmd: 'removeTask' }, { code }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
