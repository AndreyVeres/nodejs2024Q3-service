import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Controller('favs')
export class FavoriteController {
  constructor(
    private favoriteService: FavoriteService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    // const { tracks, albums, artists } = await this.favoriteService.getAll();

    return await this.favoriteService.getAll();
    // return {
    //   albums: await Promise.all(albums.map((albumId) => this.albumService.getById(albumId))),
    //   tracks: await Promise.all(tracks.map((trackId) => this.trackService.getById(trackId))),
    //   artists: await Promise.all(artists.map((artistId) => this.artistService.getById(artistId))),
    // };
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const trackIsExist = await this.trackService.checkTrackIsExist(id);

    if (trackIsExist) {
      return await this.favoriteService.addTrack(id);
    } else {
      throw new UnprocessableEntityException('track doesnt exist');
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.favoriteService.getTrackIds();

    if (track.includes(id)) {
      return await this.favoriteService.removeTrack(id);
    } else {
      throw new NotFoundException('track is not favorite');
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const albumIsExist = await this.albumService.checkAlbumIsExist(id);
    if (albumIsExist) {
      return await this.favoriteService.addAlbum(id);
    } else {
      throw new UnprocessableEntityException('album doesnt exist');
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const albums = await this.favoriteService.getAlbumIds();

    if (albums.includes(id)) {
      return await this.favoriteService.removeAlbum(id);
    } else {
      throw new NotFoundException('album is not favorite');
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artistIsExist = await this.artistService.checkArtistIsExist(id);
    if (artistIsExist) {
      return await this.favoriteService.addArtist(id);
    } else {
      throw new UnprocessableEntityException('album doesnt exist');
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artists = await this.favoriteService.getArtistsIds();

    if (artists.includes(id)) {
      return await this.favoriteService.removeArtist(id);
    } else {
      throw new NotFoundException('artist is not favorite');
    }
  }
}
