import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dtop';
import { RpcException } from '@nestjs/microservices';
import { RpcCustomException } from 'src/exceptions/rpc-custom-exception';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.userModel.findOne({
        email,
      });

      if (!user) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'Email not found');
      }

      const { password: dbPassword } = user;

      const isPasswordValid = await bcrypt.compare(password, dbPassword);

      if (!isPasswordValid) {
        throw new RpcCustomException(
          HttpStatus.UNAUTHORIZED,
          'Incorrect password',
        );
      }

      return {
        status: HttpStatus.OK,
        message: 'Login susccefull',
        data: user,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error creating task: ${error}`,
      });
    }
    return `loging ${loginDto}`;
  }
}
