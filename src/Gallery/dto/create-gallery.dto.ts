import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  description: string;
  image?: string; // Base64 string
}
