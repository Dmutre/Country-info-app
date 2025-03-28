import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class FindUserDTO {
  @ApiProperty({
    description: 'The unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'user',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;
}
