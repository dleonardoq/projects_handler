import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { rpcInterfaceException } from './rpc-interface-exception';

@Catch(RpcException)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const rpcException = exception.getError() as rpcInterfaceException;

    const status = rpcException.status || HttpStatus.INTERNAL_SERVER_ERROR;

    const errorData = {
      statusCode: status,
      message: rpcException.message || 'Internal server error',
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorData);
  }
}
