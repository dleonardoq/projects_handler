import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  document_type: string = '';

  @IsNumber()
  @IsNotEmpty()
  document_number: number = 0;

  @IsString()
  @IsNotEmpty()
  name: string = '';

  @IsString()
  @IsNotEmpty()
  last_name: string = '';

  @IsNumber()
  @IsPositive()
  @Min(18)
  age: number = 0;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birth_date: Date = new Date();

  @IsString()
  @IsNotEmpty()
  email: string = '';

  @IsString()
  @IsNotEmpty()
  password: string = '';
}
