import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/tasks.schema';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import { RpcCustomException } from 'src/common/exceptions/rpc-custom-exception';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const createdTask = new this.taskModel(createTaskDto);
      await createdTask.save();

      if (!createdTask) {
        throw new RpcCustomException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Error creating task',
        );
      }

      return {
        status: HttpStatus.CREATED,
        message: 'Task created successfully',
        data: createdTask,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error creating task: ${error}`,
      });
    }
  }

  async findAll() {
    try {
      const tasks = await this.taskModel.find({
        active: true,
      });

      if (tasks.length <= 0) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'No tasks found');
      }

      return {
        status: HttpStatus.OK,
        message: 'Tasks retrieved successfully',
        data: tasks,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error getting all task: ${error}`,
      });
    }
  }

  async findOne(code: string) {
    try {
      const task = await this.taskModel.findOne({
        code,
        active: true,
      });

      if (!task) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'Task not found');
      }

      return {
        status: HttpStatus.OK,
        message: 'Task retrieved successfully',
        data: task,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error creating task: ${error}`,
      });
    }
  }

  async update(updateTaskDto: UpdateTaskDto) {
    try {
      const { code, ...task } = updateTaskDto;

      const updatedTask = await this.taskModel.findOneAndUpdate(
        {
          code,
          active: true,
        },
        { $set: task },
        { returnDocument: 'after' },
      );

      if (!updatedTask) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'Task not found');
      }

      return {
        status: HttpStatus.OK,
        message: 'Task updated successfully',
        data: updatedTask,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error creating task: ${error}`,
      });
    }
  }

  async remove(code: string) {
    try {
      const removedTask = await this.taskModel.findOneAndUpdate(
        {
          code,
          active: true,
        },
        { $set: { active: false } },
        { returnDocument: 'after' },
      );

      if (!removedTask) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'Task not found');
      }

      return {
        status: HttpStatus.OK,
        message: 'Task removed successfully',
        data: removedTask,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error creating task: ${error}`,
      });
    }
  }
}
