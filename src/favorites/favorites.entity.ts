import { IsString, IsArray } from 'class-validator';
import { TrackEntity } from 'src/track/track.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs')
export class FavoriteEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @IsArray()
  @IsString({ each: true })
  @PrimaryColumn('text', { array: true })
  artists: string[];

  @IsArray()
  @IsString({ each: true })
  @PrimaryColumn('text', { array: true })
  albums: string[];

  @ManyToMany(() => TrackEntity)
  @JoinTable()
  tracks: string[];
}
