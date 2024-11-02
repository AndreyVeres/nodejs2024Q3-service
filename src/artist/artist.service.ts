import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from 'src/db';
import { toPromise } from 'src/shared/utils/toPromise';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistEntity } from './artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  async getAll() {
    return await toPromise(db.artists);
  }

  async getById(id: string) {
    const artist = await toPromise(db.artists.find((artist) => artist.id === id));

    console.log(db, id);
    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  async create(dto: CreateArtistDto) {
    const artist = new ArtistEntity();

    artist.grammy = dto.grammy;
    artist.name = dto.name;

    db.artists.push(artist);

    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.getById(id);

    if (!artist) throw new NotFoundException('Artist not found');

    const updated = Object.assign(artist, dto);

    return updated;
  }

  async delete(id: string) {
    const artist = await this.getById(id);

    if (!artist) throw new NotFoundException('Artist not found');

    db.artists = db.artists.filter((artist) => artist.id !== id);
  }
}
