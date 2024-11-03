import { TrackService } from 'src/track/track.service';
import { FavoriteController } from './favorites.controller';
import { FavoriteService } from './favorites.service';
import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, TrackService],
})
export class FavoriteModule {}
