import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { toPromise } from 'src/shared/utils/toPromise';

// const pr = <T>(data: T) =>
//   new Promise<T>((res) =>
//     setTimeout(() => {
//       res(data);
//     }, 444),
//   );

@Injectable()
export class UserService {
  getAll(): Promise<UserEntity[]> {
    return toPromise<UserEntity[]>(db.users);
  }

  async create(userData: CreateUserDto) {
    const { login, password } = userData;
    const user = new UserEntity();
    user.login = login;
    user.password = password;

    db.users.push(user);

    return this.buildUserRO(user);
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.getById(userId);

    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword) throw new ForbiddenException('invalid old password');

    user.password = dto.newPassword;
    user.updatedAt = new Date().getTime();
    user.version += 1;

    return this.buildUserRO(user);
  }

  async findByLogin(login: string) {
    return await toPromise<UserEntity | null>(db.users.find((user) => user.login === login));
  }

  async getById(userId: string) {
    const user = await toPromise<UserEntity | null>(db.users.find((user) => user.id === userId));

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async delete(userId: string) {
    const user = await this.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    db.users = db.users.filter((user) => user.id !== userId);
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
    };

    return userRO;
  }
}
