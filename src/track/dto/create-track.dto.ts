import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;

  @IsOptional()
  readonly artistId: string | null;

  @IsOptional()
  readonly albumId: string | null;
}
