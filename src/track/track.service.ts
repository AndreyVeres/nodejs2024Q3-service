import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { toPromise } from 'src/shared/utils/toPromise';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackEntity } from './track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(@InjectRepository(TrackEntity) private readonly trackRepository: Repository<TrackEntity>) {}

  async getAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    const track = this.trackRepository.find({ where: { id } });
    if (!track) throw new NotFoundException('track not found');

    return track;
  }

  async create(dto: CreateTrackDto) {
    const track = this.trackRepository.create(dto);
    await this.trackRepository.save(track);

    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException('track not found');

    const updatedTrack = Object.assign(track, dto);
    await this.trackRepository.save(updatedTrack);

    return updatedTrack;
  }

  async delete(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException('track not found');

    this.trackRepository.remove(track);

    //TODO
    db.favs.tracks = db.favs.tracks.filter((trackId) => trackId !== id);
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

  async removeAlbumFromTracks(id: string) {
    return await toPromise(
      (db.tracks = db.tracks.map((track) => {
        if (track.albumId === id) {
          return {
            ...track,
            albumId: null,
          };
        }

        return track;
      })),
    );
  }

  async checkTrackIsExist(id: string) {
    return await toPromise(!!db.tracks.find((track) => track.id === id));
  }
}
