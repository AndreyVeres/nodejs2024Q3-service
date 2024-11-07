import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistEntity } from './artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(@InjectRepository(ArtistEntity) private readonly artistRepository: Repository<ArtistEntity>) {}

  async getAll() {
    return await this.artistRepository.find();
  }

  async getById(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  async create(dto: CreateArtistDto) {
    const artist = this.artistRepository.create(dto);
    return this.artistRepository.save(artist);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.getById(id);
    const updated = Object.assign(artist, dto);

    return await this.artistRepository.save(updated);
  }

  async delete(id: string) {
    const artist = await this.getById(id);
    return await this.artistRepository.remove(artist);
  }
}
