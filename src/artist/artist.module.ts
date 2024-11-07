import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track/track.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from './artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, TrackService, AlbumService],
  exports: [ArtistService],
  imports: [TypeOrmModule.forFeature([TrackEntity, AlbumEntity, ArtistEntity])],
})
export class ArtistModule {}
