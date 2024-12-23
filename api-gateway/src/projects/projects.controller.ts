import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PROJECT_MICROSERVICE_KEY } from './services/projects.services';
import { catchError } from 'rxjs';

@Controller('projects')
export class ProjectsController {
  constructor(
    @Inject(PROJECT_MICROSERVICE_KEY)
    private readonly projectsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsClient
      .send({ cmd: 'createProject' }, createProjectDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  findAll() {
    return this.projectsClient.send({ cmd: 'findAllProjects' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.projectsClient.send({ cmd: 'findOneProject' }, { code }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    if ('code' in updateProjectDto) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Code property can not be updated`,
      });
    }

    const data = {
      ...updateProjectDto,
      code,
    };

    return this.projectsClient.send({ cmd: 'updateProject' }, data).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.projectsClient.send({ cmd: 'removeProject' }, { code }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
