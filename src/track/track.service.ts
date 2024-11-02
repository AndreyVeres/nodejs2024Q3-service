import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { toPromise } from 'src/shared/utils/toPromise';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackEntity } from './track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  async getAll() {
    return await toPromise(db.tracks);
  }

  async getById(id: string) {
    const track = db.tracks.find((track) => track.id === id);

    if (!track) throw new NotFoundException('track not found');

    return track;
  }

  async create(dto: CreateTrackDto) {
    const track = new TrackEntity();

    track.name = dto.name;
    track.artistId = dto.artistId;
    track.duration = dto.duration;
    track.albumId = dto.albumId;

    db.tracks.push(track);

    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.getById(id);

    if (!track) throw new NotFoundException('track not found');

    const updatedTrack = Object.assign(track, dto);

    return updatedTrack;
  }

  async delete(id: string) {
    const track = await this.getById(id);

    if (!track) throw new NotFoundException('track not found');

    db.tracks = db.tracks.filter((track) => track.id !== id);
  }

  async removeArtistFromTracks(id: string) {
    return await toPromise(
      (db.tracks = db.tracks.map((track) => {
        if (track.artistId === id) {
          return {
            ...track,
            artistId: null,
          };
        }

        return track;
      })),
    );
  }
}
