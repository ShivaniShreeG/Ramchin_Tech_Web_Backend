import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Injectable()
export class InternshipService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // ✅ Create internship
  async create(dto: CreateInternshipDto) {
    return this.prisma.internshipProject.create({
      data: {
        name: dto.name,
        image: dto.image,               // Cloudinary URL
        projects: dto.projects, 
        links: dto.links,         
      },
    });
  }

  // ✅ Get all internships
  async findAll() {
    return this.prisma.internshipProject.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // ✅ Update internship (optionally replace image)
  async update(id: number, dto: CreateInternshipDto, file?: Express.Multer.File) {
    let imageUrl = dto.image;

    if (file) {
      // Upload new image to Cloudinary if file provided
      imageUrl = await this.cloudinaryService.uploadImage(file, 'internships');
    }

    return this.prisma.internshipProject.update({
      where: { id },
      data: {
        name: dto.name,
        image: imageUrl,
        projects: dto.projects,
        links: dto.links,
      },
    });
  }

  // ✅ Delete internship
  async remove(id: number) {
    return this.prisma.internshipProject.delete({
      where: { id },
    });
  }
}
