import { v4 as uuid } from 'uuid';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ArtistEntity {
  readonly id = uuid();

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;
}
