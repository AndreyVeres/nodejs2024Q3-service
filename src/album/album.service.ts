import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumService {
  constructor(@InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>) {}

  async getAll() {
    return await this.albumRepository.find();
  }

  async getById(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('album not found');

    return album;
  }

  async create(dto: CreateAlbumDto) {
    const album = this.albumRepository.create(dto);
    return await this.albumRepository.save(album);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.getById(id);
    const updated = Object.assign(album, dto);

    return await this.albumRepository.save(updated);
  }

  async delete(id: string) {
    const album = await this.getById(id);
    return await this.albumRepository.remove(album);
  }
}
