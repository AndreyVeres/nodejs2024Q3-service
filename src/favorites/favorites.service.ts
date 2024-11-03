import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { toPromise } from 'src/shared/utils/toPromise';

@Injectable()
export class FavoriteService {
  async getAll() {
    return await toPromise(db.favs);
  }

  async addAlbum(id: string) {
    await toPromise(db.favs.albums.push(id));
    return;
  }

  async addTrack(id: string) {
    await toPromise(db.favs.tracks.push(id));
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
