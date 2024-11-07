import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsBoolean()
  @IsNotEmpty()
  readonly grammy: boolean;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
