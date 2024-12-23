import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern({ cmd: 'createTask' })
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern({ cmd: 'findAllTasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @MessagePattern({ cmd: 'findOneTask' })
  findOne(@Payload('code') code: string) {
    return this.tasksService.findOne(code);
  }

  @MessagePattern({ cmd: 'updateTask' })
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto);
  }

  @MessagePattern({ cmd: 'removeTask' })
  remove(@Payload('code') code: string) {
    return this.tasksService.remove(code);
  }
}
