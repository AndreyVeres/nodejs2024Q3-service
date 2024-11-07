import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) dto: CreateArtistDto) {
    return await this.artistService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Body(new ValidationPipe()) dto: UpdateArtistDto, @Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await Promise.all([
      this.artistService.delete(id),
      this.trackService.removeArtistFromTracks(id),
      this.albumService.removeArtistFromAlbums(id),
    ]);
  }
}
