import { IsNotEmpty, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  login: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;
  @Column()
  version: number = 1;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;
  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: number;
}
