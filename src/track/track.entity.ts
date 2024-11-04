import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { FavoriteEntity } from 'src/favorites/favorites.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  albumId: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  // @ManyToMany(() => FavoriteEntity, (favorite) => favorite.tracks)
  // favorites: FavoriteEntity[];
}
