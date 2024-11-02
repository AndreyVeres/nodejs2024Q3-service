import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class UserEntity {
  id = uuid();

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  version: number = 1;
  createdAt: number;
  updatedAt: number;
}
