import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RpcCustomException } from 'src/exceptions/rpc-custom-exception';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.usersModel(createUserDto);
      await createdUser.save();

      if (!createdUser) {
        throw new RpcCustomException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Error creating users',
        );
      }

      return {
        status: HttpStatus.CREATED,
        message: 'Users created successfully',
        data: createdUser,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error creating task: ${error}`,
      });
    }
  }

  async findAll() {
    try {
      const users = await this.usersModel.find({
        active: true,
      });

      if (users.length <= 0) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'Users not found');
      }

      return {
        status: HttpStatus.OK,
        message: 'Users found',
        data: users,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error finding users: ${error}`,
      });
    }
  }

  async findOne(documentNumber: number) {
    try {
      const user = await this.usersModel.findOne({
        active: true,
        document_number: documentNumber,
      });

      if (!user) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'User not found');
      }

      return {
        status: HttpStatus.OK,
        message: 'Users found',
        data: user,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error finding user: ${error}`,
      });
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const { document_number, ...userData } = updateUserDto;

      const updatedUser = await this.usersModel.findByIdAndUpdate(
        {
          active: true,
          document_number,
        },
        { $set: userData },
        { returnDocument: 'after' },
      );

      if (!updatedUser) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'User not found');
      }

      return {
        status: HttpStatus.OK,
        message: 'User updated',
        data: updatedUser,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error updating user: ${error}`,
      });
    }
  }

  async remove(documentNumber: number) {
    try {
      const deletedUser = await this.usersModel.findByIdAndUpdate(
        {
          active: true,
          document_number: documentNumber,
        },
        { $set: { active: false } },
        { returnDocument: 'after' },
      );

      if (!deletedUser) {
        throw new RpcCustomException(HttpStatus.NOT_FOUND, 'User not found');
      }

      return {
        status: HttpStatus.OK,
        message: 'User deleted',
        data: deletedUser,
      };
    } catch (error: RpcCustomException | any) {
      throw new RpcException({
        status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.message ?? `Error deleting user: ${error}`,
      });
    }
  }
}
