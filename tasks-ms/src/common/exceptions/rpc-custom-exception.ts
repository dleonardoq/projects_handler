import { RpcException } from '@nestjs/microservices';

export class RpcCustomException extends RpcException {
  constructor(
    public status: number,
    public message: string,
  ) {
    super({ status, message });
  }
}
