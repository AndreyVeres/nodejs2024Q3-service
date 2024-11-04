import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users.map(this.buildUserRO);
  }

  async create(userData: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { login: userData.login } });
    if (user) throw new BadRequestException('user already exist');

    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);

    delete newUser.password;
    return newUser;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');
    if (user.password !== dto.oldPassword) throw new ForbiddenException('invalid old password');
    if (user.password === dto.newPassword) {
      throw new BadRequestException('The new password must be different from the old one');
    }

    user.password = dto.newPassword;
    await this.userRepository.save(user);
    return this.buildUserRO(user);
  }

  async findByLogin(login: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return this.buildUserRO(user);
  }

  async delete(id: string): Promise<DeleteResult> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return await this.userRepository.delete(user.id);
  }

  private buildUserRO(user: UserEntity): UserEntity {
    delete user.password;
    return user;
  }
}
