import { IsNotEmpty, IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class UserEntity {
  readonly id = uuid();

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  version = 1;
  createdAt: number = new Date().getTime();
  updatedAt: number = new Date().getTime();
}
