import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;

  @IsString()
  @IsOptional()
  readonly artistId: string | null;
}
