import { IsString, IsNumber, IsOptional } from 'class-validator';
export class UpdateAlbumDto {
  @IsString()
  name: string;
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null = null;
}
