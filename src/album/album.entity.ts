import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ArtistEntity } from 'src/artist/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  year: number;

  @IsString()
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, { onDelete: 'SET NULL' })
  artist?: ArtistEntity;
}
