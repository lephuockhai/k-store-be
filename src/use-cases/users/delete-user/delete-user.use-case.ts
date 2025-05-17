import { UseCase } from '@/core/base/use-case';
import { UsersRepository } from '@/core/repositories/users.repository';
import { ConflictException } from '@nestjs/common';

export class DeleteUserUseCase implements UseCase<void> {
  constructor(private readonly repository: UsersRepository) {}

  public async execute(user_id: string): Promise<void> {
    const entity = await this.repository.findOne({ id: user_id });
    if (!entity)
      throw new ConflictException(`User ${user_id} is not existing.`);
    await this.repository.remove(user_id);
  }
}
