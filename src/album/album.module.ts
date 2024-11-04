import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TrackService } from 'src/track/track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/track/track.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
  exports: [AlbumService],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
})
export class AlbumModule {}
