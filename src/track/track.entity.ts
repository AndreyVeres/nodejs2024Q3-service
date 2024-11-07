import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity extends BaseEntity {
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

  @ManyToOne(() => AlbumEntity, (album) => album.id, { onDelete: 'SET NULL' })
  album?: AlbumEntity;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, { onDelete: 'SET NULL' })
  artist?: ArtistEntity;
}
