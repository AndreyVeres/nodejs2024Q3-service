import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService, private trackService: TrackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.albumService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Body(new ValidationPipe()) dto: UpdateAlbumDto, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.albumService.delete(id);
    await this.trackService.removeAlbumFromTracks(id);
  }
}
