import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;

  @IsOptional()
  @IsString()
  readonly artistId: string | null = null;

  @IsOptional()
  @IsString()
  readonly albumId: string | null = null;
}
