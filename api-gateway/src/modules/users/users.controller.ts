import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS_SERVICE } from './services/user.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersCLient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersCLient.send({ cmd: 'createUser' }, createUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll() {
    return this.usersCLient.send({ cmd: 'findAllUsers' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':document_number')
  findOne(@Param('document_number') documentNumber: string) {
    return this.usersCLient
      .send({ cmd: 'findOneUser' }, { document_number: documentNumber })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':document_number')
  update(
    @Param('document_number') documentNumber: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userData = {
      ...updateUserDto,
      document_number: documentNumber,
    };

    return this.usersCLient.send({ cmd: 'updateUser' }, userData).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':document_number')
  remove(@Param('document_number') documentNumber: string) {
    return this.usersCLient
      .send({ cmd: 'removeUser' }, { document_number: documentNumber })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
