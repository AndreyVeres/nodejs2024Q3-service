import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly artistId: string | null;
  @IsString()
  @IsOptional()
  readonly albumId: string | null;

  @IsNumber()
  readonly duration: string | null;
}
