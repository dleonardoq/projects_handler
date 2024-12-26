import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { RpcCustomException } from 'src/common/exceptions/rpc-custom-exception';

@Injectable()
export class ProjectsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createProjectDto: CreateProjectDto) {
    try {
      const createdProject = await this.projects.create({
        select: {
          id: false,
          code: true,
          title: true,
          description: true,
          active: false,
          createdAt: true,
          updatedAt: true,
        },
        data: createProjectDto,
      });

      return {
        status: HttpStatus.CREATED,
        message: 'Project created',
        data: createdProject,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error when trying to create project ${error}`,
      });
    }
  }

  async findAll() {
    try {
      const projects = await this.projects.findMany({
        where: {
          active: true,
        },
        select: {
          id: false,
          code: true,
          title: true,
          description: true,
          active: false,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (projects.length <= 0) {
        throw new RpcCustomException(
          HttpStatus.NOT_FOUND,
          "There're not projects",
        );
      }

      return {
        status: HttpStatus.OK,
        message: 'Projects found',
        data: projects,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error when getting all projects ${error}`,
      });
    }
  }

  async findOne(code: string) {
    try {
      const project = await this.projects.findUnique({
        where: {
          code,
          active: true,
        },
        select: {
          id: false,
          code: true,
          title: true,
          description: true,
          active: false,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!project) {
        throw new RpcCustomException(
          HttpStatus.NOT_FOUND,
          `Project ${code} not found`,
        );
      }

      return {
        status: HttpStatus.OK,
        message: 'Project found',
        data: project,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          error?.message ?? `Error when getting project by code: ${error}`,
      });
    }
  }

  async update(updateProjectDto: UpdateProjectDto) {
    const { code, ...data } = updateProjectDto;
    await this.findOne(code);

    try {
      const updatedProject = await this.projects.update({
        where: {
          code,
        },
        select: {
          id: false,
          code: true,
          title: true,
          description: true,
          active: false,
          createdAt: true,
          updatedAt: true,
        },
        data,
      });

      return {
        status: HttpStatus.OK,
        message: 'Project updated',
        data: updatedProject,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error when updating project ${error}`,
      });
    }
  }

  async remove(code: string) {
    try {
      const deletedProject = await this.projects.update({
        where: {
          code,
        },
        select: {
          id: false,
          code: true,
          title: true,
          description: true,
          active: false,
          createdAt: true,
          updatedAt: true,
        },
        data: {
          active: false,
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'Project deleted',
        data: deletedProject,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error when deleting project ${error}`,
      });
    }
  }
}
