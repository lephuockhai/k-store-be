import { Entity } from '@/core/base/entity';

export class UserEntity extends Entity {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
}
