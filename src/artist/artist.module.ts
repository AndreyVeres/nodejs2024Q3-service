import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TrackService } from 'src/track/track.service';

@Module({
  imports: [],
  controllers: [ArtistController],
  providers: [ArtistService, TrackService],
})
export class ArtistModule {}
