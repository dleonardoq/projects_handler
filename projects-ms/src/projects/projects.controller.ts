import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern({ cmd: 'createProject' })
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern({ cmd: 'findAllProjects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneProject' })
  findOne(@Payload('code') code: string) {
    return this.projectsService.findOne(code);
  }

  @MessagePattern({ cmd: 'updateProject' })
  update(@Payload() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(updateProjectDto);
  }

  @MessagePattern({ cmd: 'removeProject' })
  remove(@Payload('code') code: string) {
    return this.projectsService.remove(code);
  }
}
