import { v4 as uuid } from 'uuid';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AlbumEntity {
  id: string = uuid();
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  artistId: string | null;
}
