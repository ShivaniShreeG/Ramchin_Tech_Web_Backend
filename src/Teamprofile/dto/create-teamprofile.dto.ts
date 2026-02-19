import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTeamProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  image: string; // for now just URL or local path

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  projects?: string[]; // stored as JSON

  @IsOptional()
  experience?: string[]; // stored as JSON

  @IsOptional()
  @IsUrl()
  resume?: string;

  @IsOptional()
  reviews?: string[]; // stored as JSON
}
