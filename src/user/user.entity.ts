import { IsNotEmpty, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  login: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    transformer: { from: (a) => a.getTime(), to: (a) => a },
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    transformer: { from: (a) => a.getTime(), to: (a) => a },
  })
  updatedAt: number;
}
