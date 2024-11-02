import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';

const pr = <T>(data: T) =>
  new Promise<T>((res) =>
    setTimeout(() => {
      res(data);
    }, 444),
  );

@Injectable()
export class UserService {
  findAll(): Promise<UserEntity[]> {
    return pr<UserEntity[]>(db.users);
  }

  async create(userData: CreateUserDto) {
    const { login, password } = userData;
    const _user = await this.findByLogin(login);

    if (_user) {
      const errors = { login: 'User with this login already exist.' };
      throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
    }

    const user = new UserEntity();
    const date = new Date().getTime();

    user.login = login;
    user.password = password;
    user.updatedAt = date;
    user.createdAt = date;

    db.users.push(user);

    return user;
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.findById(userId);

    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword) throw new ForbiddenException('invalid old password');

    user.password = dto.newPassword;
    user.updatedAt = new Date().getTime();

    return user;
  }

  async findByLogin(login: string) {
    return await pr<UserEntity | null>(db.users.find((user) => user.login === login));
  }

  async findById(userId: string) {
    const user = await pr<UserEntity | null>(db.users.find((user) => user.id === userId));

    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
