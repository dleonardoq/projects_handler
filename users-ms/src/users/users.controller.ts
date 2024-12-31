import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'findAllUsers' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'findOneUser' })
  findOne(@Payload('document_number') documentNumber: number) {
    return this.usersService.findOne(documentNumber);
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern({ cmd: 'removeUser' })
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
