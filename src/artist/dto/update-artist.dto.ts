import { IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsBoolean()
  readonly grammy: boolean;
  @IsString()
  readonly name: string;
}
