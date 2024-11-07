import { TrackService } from 'src/track/track.service';
import { FavoriteController } from './favorites.controller';
import { FavoriteService } from './favorites.service';
import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track/track.entity';
import { FavoriteEntity } from './favorites.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
// FavoriteEntity
@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    TrackModule,
    TypeOrmModule.forFeature([TrackEntity, FavoriteEntity, AlbumEntity, ArtistEntity]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, TrackService],
})
export class FavoriteModule {}
