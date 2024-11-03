import { TrackService } from 'src/track/track.service';
import { FavoriteController } from './favorites.controller';
import { FavoriteService } from './favorites.service';
import { Module } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Module({
  imports: [],
  controllers: [FavoriteController],
  providers: [FavoriteService, TrackService, ArtistService, AlbumService],
})
export class FavoriteModule {}
