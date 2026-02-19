// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { CreateGalleryDto } from './dto/create-gallery.dto';
// import { CloudinaryService } from './cloudinary/cloudinary.service';
// import { Express } from 'express';

// @Injectable()
// export class GalleryService {
//   constructor(
//     private prisma: PrismaService,
//     private cloudinary: CloudinaryService,
//   ) {}
//   async create(dto: CreateGalleryDto, file: Express.Multer.File) {
//     const imageUrl = await this.cloudinary.uploadImage(file);

//     return this.prisma.gallery.create({
//       data: {
//         description: dto.description,
//         imageUrl,
//       },
//     });
//   }

//   async findAll() {
//     return this.prisma.gallery.findMany({
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   async update(id: number, dto: CreateGalleryDto, file?: Express.Multer.File) {
//   let imageUrl: string | undefined;

//   if (file) {
//     imageUrl = await this.cloudinary.uploadImage(file);
//   }

//   return this.prisma.gallery.update({
//     where: { id },
//     data: {
//       description: dto.description,
//       ...(imageUrl && { imageUrl }), // only update image if new one is uploaded
//     },
//   });
// }

// async remove(id: number) {
//   return this.prisma.gallery.delete({
//     where: { id },
//   });
// }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGalleryDto) {
    // dto.imageUrl is Base64 string
    if (!dto.image) {
      throw new Error('No image data provided');
    }
    // Convert Base64 to Buffer for Prisma Bytes field
    const imageBuffer = Buffer.from(dto.image, 'base64');

    return this.prisma.gallery.create({
      data: {
        description: dto.description,
        image: imageBuffer, // Prisma field type: Bytes
      },
    });
  }

async findAll() {
  const galleries = await this.prisma.gallery.findMany({
    orderBy: { createdAt: 'asc' },
  });

  return galleries.map((g) => ({
    ...g,
    image: g.image
      ? Buffer.from(g.image).toString('base64') // convert array → Buffer → base64
      : null,
  }));
}

  async update(id: number, dto: CreateGalleryDto) {
    const data: any = { description: dto.description };

    if (dto.image) {
      data.image = Buffer.from(dto.image, 'base64');
    }

    return this.prisma.gallery.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.gallery.delete({ where: { id } });
  }
}
