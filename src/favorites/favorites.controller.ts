import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { EntityValidationPipe } from './entity.validation.pipe';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.favoriteService.findAll();
  }

  @Post(':entity/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(
    @Param('entity', new EntityValidationPipe()) entity: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.favoriteService.addFavorite(entity, id);
  }

  @Delete(':entity/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavorite(
    @Param('entity', new EntityValidationPipe()) entity: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.favoriteService.deleteFavorite(entity, id);
  }
}
