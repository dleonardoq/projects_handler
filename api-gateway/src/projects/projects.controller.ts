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
  Logger,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PROJECT_MICROSERVICE_KEY } from './services/projects.services';
import { catchError, firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ReturnedProject } from './interfaces/returnedProject';

@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);
  constructor(
    @Inject(PROJECT_MICROSERVICE_KEY)
    private readonly projectsClient: ClientProxy,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const { code } = createProjectDto;
    const createdProject: ReturnedProject = await firstValueFrom(
      this.projectsClient.send({ cmd: 'createProject' }, createProjectDto).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );

    const { data: responsedData } = createdProject;

    await this.cacheManager.set(`project:${code}`, responsedData, 3600);

    return createdProject;
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
  async findOne(@Param('code') code: string) {
    const cacheProject = await this.cacheManager.get<string>(`project:${code}`);

    const cacheProjectJson = JSON.parse(cacheProject);

    if (cacheProjectJson) {
      this.logger.log('Project found in cache');
      return cacheProjectJson;
    }

    return this.projectsClient.send({ cmd: 'findOneProject' }, { code }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':code')
  async update(
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

    const updatedProject: ReturnedProject = await firstValueFrom(
      this.projectsClient.send({ cmd: 'updateProject' }, data).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );

    const { data: responsedData } = updatedProject;
    const { code: responsedCode } = responsedData;

    await this.cacheManager.set(
      `project:${responsedCode}`,
      responsedData,
      3600,
    );

    return updatedProject;
  }

  @Delete(':code')
  async remove(@Param('code') code: string) {
    const deletedProject: ReturnedProject = await firstValueFrom(
      this.projectsClient.send({ cmd: 'removeProject' }, { code }).pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      ),
    );

    const { data: responsedData } = deletedProject;
    const { code: responsedCode } = responsedData;

    await this.cacheManager.del(`project:${responsedCode}`);

    return deletedProject;
  }
}
