import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  @Column()
  grammy: boolean;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;
}
