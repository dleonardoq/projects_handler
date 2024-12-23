import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [ProjectsModule, TasksModule],
})
export class AppModule {}
