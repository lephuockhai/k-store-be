import { CreateUserDto } from '@/shared/dtos/users/create-user.dto';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';
import { CreateUserUseCase } from '@/use-cases/users/create-user';
import { DeleteUserUseCase } from '@/use-cases/users/delete-user';
import { FindAllUsersUseCase } from '@/use-cases/users/find-all-users';
import { FindByIdUseCase } from '@/use-cases/users/find-by-id';
import { UpdateUserUseCase } from '@/use-cases/users/update-user/update-user.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private findByIdUseCase: FindByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, data);
  }

  @Get()
  async findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findByIdUseCase.execute(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.deleteUserUseCase.execute(id);
    return { message: 'User was deleted successful.' };
  }
}
