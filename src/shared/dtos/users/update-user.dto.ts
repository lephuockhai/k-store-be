import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Le Phuoc',
  })
  first_name: string;

  @ApiProperty({
    example: 'Khai',
  })
  last_name: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;

  @ApiProperty({
    example: 'https://avatar.png',
  })
  avatar: string;
}
