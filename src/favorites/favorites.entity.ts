import { IsString, IsArray } from 'class-validator';

export class FavoriteEntity {
  @IsArray()
  @IsString({ each: true })
  artists: string[];

  @IsArray()
  @IsString({ each: true })
  albums: string[];

  @IsArray()
  @IsString({ each: true })
  tracks: string[];
}
