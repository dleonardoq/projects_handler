import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';

@Injectable()
export class ProjectValidationGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const exlcudeGuard = this.reflector.get<boolean>(
      'excludeProjectvalidationGurad',
      context.getHandler(),
    );

    if (exlcudeGuard) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const { project_code } = request.body;
    if (!project_code) {
      throw new HttpException(
        'Project project_code is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const cacheKey = `project:${project_code}`;
    const project = await this.cacheManager.get(cacheKey);

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    return true;
  }
}
