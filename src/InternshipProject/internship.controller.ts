import { Controller, Post, Get, Put, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InternshipService } from './internship.service';
import { CreateInternshipDto } from './dto/create-internship.dto';
import { CloudinaryService } from './cloudinary/cloudinary.service';


@Controller('internship')
export class InternshipController {
  constructor(
    private readonly internshipService: InternshipService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ✅ Create internship
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateInternshipDto,
  ) {
    if (file) {
      // Upload image to Cloudinary and get URL
      dto.image = await this.cloudinaryService.uploadImage(file, 'internships');
    }
    return this.internshipService.create(dto);
  }

  // ✅ Get all internships
  @Get('getAll')
  async findAll() {
    return this.internshipService.findAll();
  }

  // ✅ Update internship
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() dto: CreateInternshipDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      dto.image = await this.cloudinaryService.uploadImage(file, 'internships');
    }
    return this.internshipService.update(+id, dto);
  }

  // ✅ Delete internship
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.internshipService.remove(+id);
  }
}
