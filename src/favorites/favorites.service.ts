import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { db } from 'src/db';
import { toPromise } from 'src/shared/utils/toPromise';
import { FavoriteEntity } from './favorites.entity';
import { Repository } from 'typeorm';
import { TrackEntity } from 'src/track/track.entity';

@Injectable()
export class FavoriteService {
  constructor(
    // @InjectRepository(FavoriteEntity) private readonly favoritesRepository: Repository<FavoriteEntity>,
    // @InjectRepository(TrackEntity) private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    // return await toPromise(db.favs);

    // return await this.favoritesRepository.find();
  }

  async addAlbum(id: string) {
    await toPromise(db.favs.albums.push(id));
    return;
  }

  async addTrack(id: string) {
    await toPromise(db.favs.tracks.push(id));

    // const track = await this.trackRepository.findOne({ where: { id } });

    // if(!track) throw new NotFoundException('track not found');

    // await this.favoritesRepository.insert()

    return;
  }

  async addArtist(id: string) {
    await toPromise(db.favs.artists.push(id));
    return;
  }

  async removeTrack(id: string) {
    db.favs.tracks = db.favs.tracks.filter((trackId) => trackId !== id);
  }

  async removeAlbum(id: string) {
    db.favs.albums = db.favs.albums.filter((albumId) => albumId !== id);
  }

  async removeArtist(id: string) {
    db.favs.artists = db.favs.artists.filter((artistsId) => artistsId !== id);
  }

  async getTrackIds() {
    return await toPromise(db.favs.tracks);
  }

  async getAlbumIds() {
    return await toPromise(db.favs.albums);
  }

  async getArtistsIds() {
    return await toPromise(db.favs.artists);
  }
}
