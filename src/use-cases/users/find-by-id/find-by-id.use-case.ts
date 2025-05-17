import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/users/created-user';
import { UsersRepository } from '@/core/repositories/users.repository';
import { CreatedUserDto } from '@/shared/dtos/users/created-user.dto';
import { ConflictException } from '@nestjs/common';

export class FindByIdUseCase implements UseCase<CreatedUserDto> {
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UsersRepository) {
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(user_id: string): Promise<CreatedUserDto> {
    const entity = await this.repository.findOne({ id: user_id });
    if (!entity)
      throw new ConflictException(`User ${user_id} is not existing.`);
    return this.createdUserMapper.mapTo(entity);
  }
}
