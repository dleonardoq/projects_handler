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
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TASK_MICROSERVICE_KEY } from './services/tasks.services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ProjectValidationGuard } from 'src/common/guards/project-validation.guard';

@UseGuards(ProjectValidationGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TASK_MICROSERVICE_KEY) private readonly tasksCliente: ClientProxy,
  ) {}

  @Post(':project_code')
  create(
    @Param('project_code') project_code: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const taskData = {
      projectCode: project_code,
      createTaskDto,
    };
    return this.tasksCliente.send({ cmd: 'createTask' }, taskData).pipe(
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

  @Patch(':project_code/:code')
  update(
    @Param('project_code') projecCode: string,
    @Param('code') code: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const data = {
      ...updateTaskDto,
      code,
      projecCode,
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
