import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './user.entity';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserEntity> {
    return await this.userService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) userData: CreateUserDto) {
    return await this.userService.create(userData);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) passwordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, passwordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.delete(id);
  }
}
