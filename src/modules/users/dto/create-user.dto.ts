import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  last_name?: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}