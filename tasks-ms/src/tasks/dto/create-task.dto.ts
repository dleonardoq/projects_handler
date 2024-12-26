import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { taskStatus } from 'src/config/taskStatus';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  dscription: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  limit_date: Date;

  @IsEnum(taskStatus)
  @IsNotEmpty()
  status: taskStatus;
}
