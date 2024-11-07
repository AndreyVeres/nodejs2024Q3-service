import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('favs')
export class FavoriteEntity {
  @PrimaryColumn({ primary: true, type: 'integer', default: 1 })
  id: number;

  @ManyToMany(() => TrackEntity)
  @JoinTable()
  tracks: TrackEntity[];

  @ManyToMany(() => AlbumEntity)
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity)
  @JoinTable()
  artists: ArtistEntity[];
}
