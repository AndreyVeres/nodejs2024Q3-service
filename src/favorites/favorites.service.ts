import { Injectable, OnModuleInit, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './favorites.entity';
import { Repository } from 'typeorm';
import { TrackEntity } from 'src/track/track.entity';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';

@Injectable()
export class FavoriteService implements OnModuleInit {
  constructor(
    @InjectRepository(FavoriteEntity) private readonly favoritesRepository: Repository<FavoriteEntity>,
    @InjectRepository(TrackEntity) private readonly trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity) private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async onModuleInit() {
    const favoriteExists = await this.favoritesRepository.findOne({ where: { id: 1 } });
    if (!favoriteExists) {
      const favorite = this.favoritesRepository.create({ id: 1 });
      await this.favoritesRepository.save(favorite);
    }
  }

  async findAll() {
    const favorites = await this.favoritesRepository.findOne({
      where: { id: 1 },
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    return {
      albums: favorites.albums,
      tracks: favorites.tracks,
      artists: favorites.artists,
    };
  }

  async addFavorite(entityName: string, id: string) {
    const entity = await this.findEntity(entityName, id);

    if (!entity) {
      throw new UnprocessableEntityException(`${entityName} with id:${id} not found`);
    }

    const favorites = await this.favoritesRepository.findOne({
      where: { id: 1 },
      relations: { [`${entityName}s`]: true },
    });

    await this.favoritesRepository.save({
      id: 1,
      [`${entityName}s`]: [...favorites[`${entityName}s`], entity],
    });
  }

  async deleteFavorite(entityName: string, id: string) {
    const entityToRemove = await this.findEntity(entityName, id);
    if (!entityToRemove) {
      throw new UnprocessableEntityException(`${entityName} with id:${id} not found`);
    }

    const favorites = await this.favoritesRepository.findOne({
      where: { id: 1 },
      relations: { [`${entityName}s`]: true },
    });

    if (!favorites) {
      throw new UnprocessableEntityException('FAVS not found');
    }
    favorites[`${entityName}s`] = favorites[`${entityName}s`].filter((item) => item.id !== id);

    return await this.favoritesRepository.save(favorites);
  }

  private findEntity(entityName: string, id: string): Promise<TrackEntity | AlbumEntity | ArtistEntity | null> {
    return this[`${entityName}Repository`].findOne({ where: { id } });
  }
}
