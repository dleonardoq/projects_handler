import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dtop';
import { catchError } from 'rxjs';
import { AUTH_MICROSERVICE_KEY } from './services/login.services';

@Controller('login')
export class AuthController {
  constructor(
    @Inject(AUTH_MICROSERVICE_KEY) private readonly authClient: ClientProxy,
  ) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authClient.send({ cmd: 'login' }, loginDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
