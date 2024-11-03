import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { toPromise } from 'src/shared/utils/toPromise';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  async getAll() {
    return toPromise(db.albums);
  }

  async getById(id: string) {
    const album = await toPromise(db.albums.find((alb) => alb.id === id));

    if (!album) throw new NotFoundException('album not found');

    return album;
  }

  async create(dto: CreateAlbumDto) {
    const album = new AlbumEntity();
    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;

    db.albums.push(album);

    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.getById(id);

    if (!album) throw new NotFoundException('Album not found');

    const updated = Object.assign(album, dto);

    return updated;
  }

  async delete(id: string) {
    const album = await this.getById(id);

    if (!album) throw new NotFoundException('Album not found');

    db.albums = db.albums.filter((album) => album.id !== id);
    db.favs.albums = db.favs.albums.filter((albumId) => albumId !== id);
  }

  async removeArtistFromAlbums(id: string) {
    return await toPromise(
      (db.albums = db.albums.map((album) => {
        if (album.artistId === id) {
          return {
            ...album,
            artistId: null,
          };
        }

        return album;
      })),
    );
  }

  async checkAlbumIsExist(id: string) {
    return await toPromise(!!db.albums.find((album) => album.id === id));
  }
}
