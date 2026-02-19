// 

import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('upload')
  create(@Body() dto: CreateGalleryDto) {
    return this.galleryService.create(dto);
  }

  @Get('download')
  findAll() {
    return this.galleryService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateGalleryDto) {
    return this.galleryService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
