export class CreateInternshipDto {
  name: string;
  image?: string;       // Cloudinary URL
  projects?: string;  // array of project names
  links?: string;     // array of project links
}
