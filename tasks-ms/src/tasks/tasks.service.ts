import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(code: string) {
    return `This action returns a task`;
  }

  update(updateTaskDto: UpdateTaskDto) {
    return `This action updates a task`;
  }

  remove(code: string) {
    return `This action removes a task`;
  }
}
