import { v4 as uuid } from 'uuid';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TrackEntity {
  readonly id: string = uuid();

  @IsNotEmpty()
  @IsString()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
