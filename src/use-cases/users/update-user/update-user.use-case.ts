import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/users/created-user';
import { UpdateUserMapper } from '@/core/domain/mappers/users/update-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { CreatedUserDto } from '@/shared/dtos/users/created-user.dto';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';
import { ConflictException } from '@nestjs/common';

export class UpdateUserUseCase implements UseCase<CreatedUserDto> {
  private createUserMapper: UpdateUserMapper;
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UsersRepository) {
    this.createUserMapper = new UpdateUserMapper();
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(
    id: string,
    user: UpdateUserDto,
  ): Promise<CreatedUserDto> {
    const exist = await this.repository.findOne({ id: id });
    if (!exist) throw new ConflictException(`User ${id} is not existing.`);
    const entity = this.createUserMapper.mapFrom(user);
    const createdUser = await this.repository.update(id, entity);
    return this.createdUserMapper.mapTo(createdUser);
  }
}
