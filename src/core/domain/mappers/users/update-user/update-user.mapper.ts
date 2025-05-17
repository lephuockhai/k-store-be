import { Mapper } from '@/core/base/mapper';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { UpdateUserDto } from '@/shared/dtos/users/update-user.dto';

export class UpdateUserMapper extends Mapper<UpdateUserDto, UserEntity> {
  public mapFrom(data: UpdateUserDto): UserEntity {
    const user = new UserEntity();

    user.first_name = data.first_name;
    user.last_name = data.last_name;
    user.password = data.password;
    user.avatar = data.avatar;

    return user;
  }

  public mapTo(data: UserEntity): UpdateUserDto {
    const user = new UpdateUserDto();

    user.first_name = data.first_name;
    user.last_name = data.last_name;
    user.password = data.password;
    user.avatar = data.avatar;

    return user;
  }
}
